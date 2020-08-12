export default {
  page: {
    'usercenter/dashboard': {
      data: {
        orderInfo: {
          confirm: 'number',
          eduPaid: 'number',
        },
        assetsInfo: {
          balance: 'string',
          points: 'number',
        }
      },
      events: {
        beforeCreateOrderAsync: {
          _type: 'snippet',
          snippet: 'beforeCreateOrderAsync.on(${1:""}, (args) => {})',
        },
        afterCreateOrder: 'sync',
      },
      getProcess: {
        createOrder: 'async',
        startPay: 'async',
      }
    },
    'trade/order-result': {
      data: {
        delivery: {
          expressType: 'string',
          address: {
            addressDetail: 'string',
            country: 'string',
          }
        },
        selfFetch: 'string',
      },
      events: {
        beforeCreateOrderAsync: 'async',
        afterCreateOrder: 'sync',
      },
      getProcess: {
        createOrder: 'async',
        startPay: 'async',
      }
    }
  },
  common: {
    app: {
      shop: {
        kdtId: 'number',
      }
    },
    navigate: {
      _type: 'snippet',
      snippet: 'navigate(${1|"homeDashboard","goodsDetail","buy"|}, {redirectUrl:"xxx"}, "redirectTo")',
    },
    request: {
      _type: 'snippet',
      snippet: `request({
        isv: 'xxx.isv-dev.youzan.com', 
        path: '/xxx',
        method: 'GET',
        succeed: (res) => {
            console.log('res', res);
        }, 
        failed: (err) => {
            console.log('err', err);
        }
      })
      `,
    },
  }
};
