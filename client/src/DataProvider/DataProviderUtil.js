const getPlayersGWUrl = (playerId) =>
  fetch(
    `/api/https://fantasy.premierleague.com/api/entry/${playerId}/history/`
  );
const getPlayerUrl = (playerId) =>
  fetch(`/api/https://fantasy.premierleague.com/api/entry/${playerId}/`);

export function getGWPointsTableData(playersList, data) {
  for (let i = 0; i < data.currentGW; i++) {
    let gw = i + 1;

    let gwPts = {};
    playersList.forEach((playerId) => {
      gwPts[playerId] = data.gwPts[playerId][i];
    });
    data.pointsTable[gw] = gwPts;
  }
  playersList.forEach((playerId) => {
    data.pointsTable['Total'][playerId] =
      data.totalPts[playerId][data.currentGW - 1];
  });
}

// Function to get teamnames
export function getTeamnames(playersList, colors, data) {
  const promiseArray = [];
  playersList.forEach((playerId, index) => {
    let singleP = getPlayerUrl(playerId)
      .then((response) => response.json())
      .then((playerData) => {
        data.teamnames[playerId] = {
          name: playerData.name,
          color: colors[index],
        };
      });
    promiseArray.push(singleP);
  });
  return Promise.all(promiseArray);
}

// Function to get teamnames
export function getGWPoints(playersList, data) {
  const promiseArray = [];

  playersList.forEach((id) => {
    let singleP = getPlayersGWUrl(id)
      .then((response) => response.json())
      .then((gwData) => {
        data.gwPts[id] = [];
        data.totalPts[id] = [];
        gwData.current.forEach((res) => {
          data.gwPts[id].push(res.points - res.event_transfers_cost);
          data.totalPts[id].push(res.total_points);
          data.currentGW = res.event;
        });
      });
    promiseArray.push(singleP);
  });
  return Promise.all(promiseArray);
}

export function getMoney(playersList, data) {
  for (let i = 0; i < data.gwPts[playersList[0]].length; i++) {
    let gw = i + 1;
    data.money[gw] = {};
    let scoringArr = [];
    for (let x = 0; x < playersList.length; x++) {
      scoringArr.push(data.gwPts[playersList[x]][i]);
    }

    let ranks = calculateContribution(scoringArr);
    for (let k = 0; k < ranks.length; k++) {
      data.money[gw][playersList[k]] = ranks[k];
      if (typeof data.money['Total'][playersList[k]] === 'undefined') {
        data.money['Total'][playersList[k]] = 0;
      }
      data.money['Total'][playersList[k]] += ranks[k];
    }
  }
}

function rankings(arr) {
  var sorted = arr.slice().sort(function (a, b) {
    return b - a;
  });
  var ranks = arr.slice().map(function (v) {
    return sorted.indexOf(v) + 1;
  });
  return ranks;
}

export function getEndOfWeekRanking(playersList, data) {
  for (let i = 0; i < data.totalPts[playersList[0]].length; i++) {
    let gw = i + 1;
    data.endOfWeekRanking[gw] = {};
    let ranking = [];
    for (let x = 0; x < playersList.length; x++) {
      ranking.push(data.totalPts[playersList[x]][i]);
    }

    let ranks = rankings(ranking);
    for (let k = 0; k < ranks.length; k++) {
      data.endOfWeekRanking[gw][playersList[k]] = ranks[k];
    }
  }
}

function calculateContribution(arr) {
  let sorted = arr.slice().sort(function (a, b) {
    return b - a;
  });
  let ranks = arr.slice().map(function (v) {
    return sorted.indexOf(v) + 1;
  });
  return paymentcalculator(ranks);
}

function paymentcalculator(arr) {
  let unique = arr.filter(onlyUnique);
  let output = new Array(arr.length);
  if (unique.length == arr.length) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == 1) {
        output[i] = 0;
      }
      if (arr[i] == 2) {
        output[i] = 1;
      }
      if (arr[i] == 3) {
        output[i] = 2;
      }
      if (arr[i] == 4) {
        output[i] = 4;
      }
    }
  }
  if (unique.length == 1) {
    for (let i = 0; i < arr.length; i++) {
      output[i] = 4;
    }
  }
  if (unique.length == 2) {
    let noOfDuplicate = countDuplicates(arr);
    // 2 pairs of duplicates
    // 2 * 2 way tie
    if (noOfDuplicate == 2) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
          output[i] = 2;
        }
        if (arr[i] == 3) {
          output[i] = 4;
        }
      }
    }
    // not 2 pairs of duplicate, then either [1,1,1,4] or [1,2,2,2]
    if (noOfDuplicate == 1) {
      //3 way tied in first place
      if (Math.max(...arr) == 4) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == 1) {
            output[i] = 2;
          }
          if (arr[i] == 4) {
            output[i] = 4;
          }
        }
      }
      //3 way tied in last place
      if (Math.max(...arr) == 2) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == 1) {
            output[i] = 0;
          }
          if (arr[i] == 2) {
            output[i] = 4;
          }
        }
      }
    }
  }
  if (unique.length == 3) {
    let duplicatedArr = find_duplicate_in_array(arr);
    //one way tie at 1st place
    if (duplicatedArr[0] == 1) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
          output[i] = 1;
        }
        if (arr[i] == 3) {
          output[i] = 2;
        }
        if (arr[i] == 4) {
          output[i] = 4;
        }
      }
    }
    //one way tie at 2nd place
    if (duplicatedArr[0] == 2) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
          output[i] = 0;
        }
        if (arr[i] == 2) {
          output[i] = 2;
        }
        if (arr[i] == 4) {
          output[i] = 4;
        }
      }
    }
    //one way tie at 3rd place
    if (duplicatedArr[0] == 3) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
          output[i] = 0;
        }
        if (arr[i] == 2) {
          output[i] = 1;
        }
        if (arr[i] == 3) {
          output[i] = 4;
        }
      }
    }
  }
  return output;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function countDuplicates(original) {
  let counts = {},
    duplicate = 0;
  original.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  for (var key in counts) {
    if (counts.hasOwnProperty(key)) {
      if (counts[key] > 1) {
        duplicate++;
      }
    }
  }
  return duplicate;
}

function find_duplicate_in_array(arr) {
  let object = {};
  let result = [];

  arr.forEach(function (item) {
    if (!object[item]) object[item] = 0;
    object[item] += 1;
  });

  for (var prop in object) {
    if (object[prop] >= 2) {
      result.push(prop);
    }
  }
  return result;
}
