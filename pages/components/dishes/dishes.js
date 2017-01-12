var app = getApp()
Page({
    data: {
        hidden:false,
        curNav:1,
        curIndex:0,
        cart:[],
        cartTotal:0,
        totalPrice:0,
        navList:[
            {
                id:1,
                name:'热销菜品'
            },
            {
                id:2,
                name:'热菜'
            },
            {
                id:3,
                name:'凉菜'
            },
            {
                id:4,
                name:'套餐'
            }
        ],
        dishesList:[
            [
                {
                    name:"红烧肉",
                    price:38,
                    num:1,
                    id:1
                },
                {
                    name:"宫保鸡丁",
                    price:58,
                    num:1,
                    id:29
                },
                {
                    name:"水煮鱼",
                    price:88,
                    num:1,
                    id:2
                }
            ],
            [
                {
                    name:"小炒日本豆腐",
                    price:18,
                    num:1,
                    id:3
                },
                {
                    name:"烤鱼",
                    price:58,
                    num:1,
                    id:4
                }
            ],
            [
                {
                    name:"大拌菜",
                    price:18,
                    num:1,
                    id:5
                },
                {
                    name:"川北凉粉",
                    price:8,
                    num:1,
                    id:6
                }
            ],
            []
        ],
        dishes:[]
    },
    loadingChange () {
        setTimeout(() => {
            this.setData({
            hidden:true
        })
    },2000)
    },
    selectNav (event) {
        let id = event.target.dataset.id,
            index = parseInt(event.target.dataset.index);
        self = this;
        this.setData({
            curNav:id,
            curIndex:index
        })
    },
    aDish (event) {
        let dish = event.currentTarget.dataset.dish;
        let totalPrice = this.data.totalPrice;
        this.data.cart.push(dish);
        totalPrice = totalPrice + dish.price;
       
        this.setData({
            cartTotal:this.data.cart.length,
            totalPrice: totalPrice
        })
        this.setStatus(dish.id)
    },
     mDish (event) {
        let dish = event.currentTarget.dataset.dish;
        let totalPrice = this.data.totalPrice;
        let index = 0;
        let self = this;
        let flag = false;
        if(this.data.cart.length > 0){
            this.data.cart.forEach(function(item,index){
                console.log("item", item);
                console.log("dish", dish);
                if(item.id == dish.id){
                   flag = true;
                   index = self.data.cart.indexOf(item);
                   return
                }
            })
            if(flag){
                this.data.cart.splice(index, 1);
                totalPrice = totalPrice - dish.price;
            
                this.setData({
                    cartTotal:this.data.cart.length,
                    totalPrice: totalPrice
                })
                this.setStatus(dish.id)
            }else{
                //alert this item is not in the cart
            }
        
        }
    
    },
    // 选择菜品
    selectDish (event) {
        let dish = event.currentTarget.dataset.dish;
        let flag = true;
        let	cart = this.data.cart;
        let totalPrice = this.data.totalPrice;
        console.log("totalPrice", totalPrice);

        if(cart.length > 0){
            cart.forEach(function(item,index){
                console.log("item", item);
                if(item.id == dish.id){
                    cart.splice(index,1);
                    flag = false;
                }
            })
        }
        if(flag) {
            cart.push(dish);
            totalPrice = totalPrice + dish.price;
        }else{
            totalPrice = totalPrice - dish.price;
        }
        this.setData({
            cartTotal:cart.length,
            totalPrice: totalPrice
        })
        this.setStatus(dish.id)
    },
    calculateTotalPrice (cart){
        cart.forEach(function(item,index){
            if(item == dish){
                cart.splice(index,1);
                flag = false;
            }
        })
    },
    setStatus (dishId) {
        let dishes = this.data.dishesList;
        for (let dish of dishes){
            dish.forEach((item) => {
                if(item.id == dishId){
                item.status = !item.status || false
            }
        })
        }

        this.setData({
            dishesList:this.data.dishesList
        })
    },
    onLoad () {
        this.loadingChange()
    }
})