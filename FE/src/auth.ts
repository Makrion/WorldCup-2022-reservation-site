export const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzVlMDIyNWQxMDgxNDM5NDAzN2NhMmI4Y2E1MTBjZGI0OGU4NTEzZjU3ZjczNDIxN2NlYjBlNGExMjRkNWNlOTU0YzhkODg4NDYzNmM4MzMiLCJpYXQiOjE2NzIyMzc1OTkuMzE3ODA5LCJuYmYiOjE2NzIyMzc1OTkuMzE3ODExLCJleHAiOjE3MDM3NzM1OTkuMzE0MDQ3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.PfQt3tjvQxuwxtP01LdtVImLBZo_TQOouzOtwPyWFC4w34YOfoywmhcIpZZDq-MP4hrKzziENZ4yKoWt49_yrFuyZG453J8-e8Tay6_4HgpM_LIqZyewt2VKYt48ohQG_5erU3IQ-Ne-mBBDjNrSrH717Q2beGvKDwkafeLZrryw6EU6UEyPmZYfxLeM47vhtvYlOULcZGTXptPiJRxnmTXpIGODjtxiuLEv59K8GoIoSsXFB0P5yniJ24u7hh2mjJY8sgINr-95oInxR85_oWU2AOXxVRis7siT5hpoY4j9rX5pAGl0jKvqQ3AwwN49ZibRYKM7prYavT_arpz4JxOwaRC_A01mmpQXOSmbpWvTcJSiGe98Y_szrdPip5XkQscTZcMZEK5FtJoSR0l05AGwqXLQccEM7hWYFy2P1JRq0yJiCfPNCrFSF6w98mZvavsQldzXGmcFQTFDjuePrq1aDcD_FVD27xm6WS9ukjg9VlTT02yLkL2V9PnO5fYQ068z028-eZGxmzxVMLbNQz0CT5ZJ3vx3buF3t0zicU4f80R5uEg7j3w2L0M3anb4N2rxI2_FSEuypzHBllIvCcO29gaaIuoqENSASDY0VwPzik0dsvkUXOTIl9RGliB0jyM5G0Zy02jHIZ3p4hEQgLhDvDi7zobxiS2BYFvIHKo';

export function authHeader() {
    return {
        "Authorization": `Bearer ${AUTH_TOKEN}`
    }
}