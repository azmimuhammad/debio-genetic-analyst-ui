function extrinsicCallback (api, { events, status, callback, unsub }) {
  if (status.isFinalized) {
    // find/filter for success events
    const eventList = events.filter(({ event }) => api.events.system.ExtrinsicFailed.is(event));
    if (eventList.length > 0) {
      console.log(JSON.stringify(eventList, null, 2))
      if (callback) callback(); // If callback not undefined
      unsub();
    }
  }
}

export async function unstakeGeneticAnalyst(api, pair, callback = () => {}) {
  const result =  await api.tx.geneticAnalysts
    .unstakeGeneticAnalyst()
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      extrinsicCallback(api, { events, status, callback, result })
    )
  console.log("result", result)
}
// function extrinsicCallback(api, { events, status }) {
//   if (status.isFinalized) {
//     // find/filter for success events
//     const eventList = events.filter(({ event }) => api.events.system.ExtrinsicSuccess.is(event))
//     console.log("eventList", eventList)
//   }
// }


export async function unstakeGeneticAnalystFee(api, pair) {
  return api.tx.geneticAnalysts
    .unstakeGeneticAnalyst()
    .paymentInfo(pair)
}

export async function updateGeneticAnalystFee(api, pair, geneticAnalystsInfo) {
  return api.tx.geneticAnalysts
    .updateGeneticAnalyst(geneticAnalystsInfo)
    .paymentInfo(pair)
}
