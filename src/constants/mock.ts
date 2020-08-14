export default {
  page: {
    'src/packages/usercenter/dashboard/': {
      data: {
        orderInfo: {
          confirm: 'number',
          eduPaid: 'number',
          evaluate: 'number',
          feedback: 'number',
          paid: 'number',
          sent: 'number',
          toPay: 'number',
        },
        assetsInfo: {
          balance: 'string',
          points: 'number',
          cards: 'number',
          coupons: 'number',
        }
      },
    },
    'src/packages/order/': {
      data: {
        prepare: {
          addressList: 'array',
          contactList: 'array',
        },
        delivery: {
          expressType: 'string',
          address: {
            recipients: 'string',
            tel: 'string',
            province: 'string',
            city: 'string',
            county: 'string',
            addressDetail: 'string',
          },
          selfFetch: {
            shop: {
              name: 'string',
              tel: 'string',
              province: 'string',
              city: 'string',
              county: 'string',
              addressDetail: 'string',
            },
            contact: {
              tel: 'string',
              recipients: 'string',
            }
          }
        },
        payment: {
          goodsPay: 'number',
          realPay: 'number',
          postage: 'number',
          couponDecrease: 'number',
          prepayCardDecrease: 'number',
          points: 'number',
          pointsDeductAmount: 'number',
        },
        goodsList: 'array',
        unavailableGoodsList: 'array',
        buyerMsg: 'string',
        order: {
          bookKey: 'string',
          orderNo: 'string',
          orderCreated: 'boolean',
        },
        payCardGroup: {
          giftCardNos: 'array',
          valueCardNos: 'array',
          valueBalanceNos: 'array',
        },
        coupon: {
          id: 'number',
          couponType: 'string',
          outerCoupon: 'number',
        },
        extra: {
          pointDeduction: 'object',
        }
      },
      events: {
        onExpressChanged: {
          _type: 'snippet',
          snippet: 'onExpressChanged.on(${1:""}, (delivery) => {})',
        },
        beforeCreateOrderAsync: {
          _type: 'snippet',
          snippet: 'beforeCreateOrderAsync.on(${1:""}, ({ delivery, goodsList, payment }) => {})',
        },
        afterCreateOrder: {
          _type: 'snippet',
          snippet: 'afterCreateOrder.on(${1:""}, ({ orderNo }) => {})',
        },
        onPayItemClickAsync: {
          _type: 'snippet',
          snippet: 'onExpressChanged.on(${1:""}, ({ payChannel, payChannelName }) => {})',
        },
      },
      getProcess: {
        _type: 'snippet',
        snippet: 'getProcess(${1|"createOrder","getPayWays","startPay","fetchShow","selectAddress","switchExpress","fetchSelfFetch","selectSelfFetchAddress","setContact","setSelfFetchTime","fetchShowByBookKey","setPointDeductionCost"|})'
      }
    },
    'src/packages/order-extra/paid/': {
      data: {
        orderNo: 'string',
        payWayStr: 'string',
      },
      getProcess: {
        _type: 'snippet',
        snippet: 'getProcess(${1|"handleOrderDetail","handleSelfFetchCode","handleVirtualTicket","handleOpenShare"|})'
      }
    },
    'src/packages/trade/order/list/': {
      data: {
        selectedTab: 'string',
      },
      getProcess: {
        _type: 'snippet',
        snippet: 'getProcess(${1|"btnClickHandle","orderClick"|})'
      }
    },
    'src/packages/trade/order/result/': {
      data: {
        goodsList: 'array',
        paymentInfo: {
          postage: 'number',
          realPay: 'number',
        },
        orderInfo: {
          orderNo: 'string',
          createTime: 'number',
          payTime: 'number',
          stateStr: 'string',
          isShowConfirmOrder: 'boolean',
          isShowShareOrder: 'boolean',
          isShowExpress: 'boolean',
          isShowEvaluateOrder: 'boolean',
          isShowViewEvaluate: 'boolean',
        },
        shopInfo: {
          kdtId: 'number',
          shopName: 'string',
        },
      },
      getProcess: {
        _type: 'snippet',
        snippet: 'getProcess(${1|"showRefund","confirmOrder","shareOrder","evaluateOrder","viewEvaluate"|})'
      },
      updateComponent: {
        _type: 'snippet',
        snippet: 'updateComponent(${1|"OrderAddress"|}, display)'
      }
    },
    'src/pages/goods/cart': {
      data: {
        goodsList: 'array',
        shopList: 'array',
      },
      getProcess: {
        _type: 'snippet',
        snippet: 'getProcess(${1|"selectGoods","cancelSelectGoods","setGoodsNum","batchDeleteGoods","deleteGoods","emptyCart","createAndGoOrder"|})'
      }
    },
    'src/packages/goods/detail': {
      data: {
        shop: {
          logo: 'string',
          name: 'string',
          url: 'string',
          certType: 'number',
        },
        sku: {
          collectionId: 'number',
          collectionPrice: 'number',
          hideStock: 'boolean',
          maxPrice: 'number',
          minPrice: 'number',
          noneSku: 'boolean',
          price: 'string',
          soldNum: 'number',
          stockNum: 'number',
          list: 'array',
          messages: 'array',
          tree: 'array',
        },
        goodsItem: {
          alias: 'string',
          title: 'string',
          picture: 'string',
          sellPoint: 'string',
          origin: 'string',
          isVirtual: 'boolean',
          isVirtualTicket: 'boolean',
          isDisplay: 'boolean',
          limitBuy: 'boolean',
          waitToSoldTime: 'number',
          buyWay: 'number',
          buyUrl: 'string',
          isSupportFCode: 'boolean',
          forbidBuyReason: 'string',
          isGoodsCollected: 'boolean',
          isInstallment: 'boolean',
          soldNum: 'number',
          subTitle: 'string',
          price: 'number',
          oldPrice: 'number',
          risk: {
            match: 'boolean',
            note: 'string',
          },
        },
        refund: {
          isSupport: 'boolean',
          type: 'number',
          interval: 'string',
        },
        multistore: {
          name: 'string',
        },
        shopConfig: {
          isShowBuyBtn: 'boolean',
          isSecuredTransactions: 'boolean',
          showRecommendGoods: 'boolean',
          showBuyRecord: 'boolean',
          showCustomerReviews: 'boolean',
          supportFreightInsurance: 'boolean',
          hideShoppingCart: 'boolean',
          hasPhysicalStore: 'boolean',
        },
        guarantee: {
          on: 'boolean',
          style: 'number',
        },
        distribution: {
          postage: 'string',
          supportExpress: 'boolean',
          supportSelfFetch: 'boolean',
          supportLocalDelivery: 'boolean',
          expressFee: 'number',
          localDeliveryFee: 'number',
        }
      },
      events: {
        beforeCartSubmit: {
          _type: 'snippet',
          snippet: 'beforeCartSubmit.on(${1:""}, () => {})',
        },
        afterBuy: {
          _type: 'snippet',
          snippet: 'afterBuy.on(${1:""}, () => {})',
        },
      },
      getProcess: {
        _type: 'snippet',
        snippet: 'getProcess(${1|"showSKU"|})'
      },
      updateComponent: {
        _type: 'snippet',
        snippet: 'updateComponent(${1|"GoodsInfo","GoodsBottom"|}, display, options)'
      }
    }
  },
  common: {
    app: {
      shop: {
        kdtId: 'number',
      },
      user: {
        gender: 'string',
        avatar: 'string',
        mobile: 'string',
        nickName: 'string',
        openId: 'string',
        userOpenId: 'string',
      }
    },
    navigate: {
      _type: 'snippet',
      snippet: 'navigate(${1|"homeDashboard","goodsDetail","buy","cart","showcaseFeature","userCenter","orderList","addressList","orderDetail","orderExpress","userSettings","accountSettings","cardPackages","userCounponList","pointGoodsDetail","pointCenter","login","eTicketDetail","salesmanCenter","refundList"|}, {}, ${2|"redirectTo","navigateTo","navigateBack","reLaunch"|})',
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
