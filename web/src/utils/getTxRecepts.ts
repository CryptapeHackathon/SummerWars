export default web3 => hash => {
  let remain = 10
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      remain -= 1
      if (remain > 0) {
        web3.eth.getTransactionReceipt(hash).then((res: any) => {
          if (res.result) {
            clearInterval(interval)
            resolve(res)
          }
        })
      } else {
        clearInterval(interval)
        reject(new Error('No Receipt Received'))
      }
    }, 1000)
  })
}
