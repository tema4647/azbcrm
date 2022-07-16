<template>
  <div class="mark">

    <!-- панель выбора группы -->
    <div class="selectionGroup">
      <Basis>
        <div class="selectionGroup__header">
          <img class="selectionGroup__header-icon" src="../assets/icons/group.png" alt="">
          <img class="selectionGroup__header-icon" src="../assets/icons/teachers.png" alt="">
        </div>
        <div class="group-wrapper">
          <div v-for="group in GROUPS" :key="group.id"  class="group">
            <span class="group__name">{{group.group_name}}</span>
          </div>
        </div>
      </Basis>
    </div>

    <!-- таблица -->
    <div class="mark__table">
      <Basis>
        <div class="mark__table-header">
          <span class="heart__header-group">Дошколята</span>
          <span class="heart__heder-month">Ноябрь</span>
          <img class="heart__header-loc" src="../assets/icons/lock.png" alt="" >
        </div>

        
        <div  class="LongCard LongCard-numbers"> 
          <span  class="LongCard__title"></span>
          <ul class="LongCard__list">
            <li v-for="number in 30" :key="number.id"  class="LongCard__list-item LongCard__list-item-numbers">0</li>
          </ul>
        </div>

        <div class="mark__table-table">
          <div v-for= "card in cards" :key= "card.id"  class="LongCard"> 
            <span  class="LongCard__title">{{card.name}}</span>
            <ul class="LongCard__list">
              <li v-for= "cell in 31" :key= "cell.id" @dblclick = "toggleEl"  class= "LongCard__list-item">
                <span v-if= "point"  class="list-item__dot"></span>
              </li>
            </ul>
            <div class="cardElem">
              <i class="pi pi-bolt" ></i>
              <i class="pi pi-credit-card" @click="visibleRight = true"></i>
            </div>
          </div>
        </div>

      </Basis>
      
    </div>

    <!-- деньги -->
    <Sidebar v-model:visible="visibleRight" position="right">
	   <Money>
       <div class="money__client-name">Репетун Макар</div>
     </Money>
    </Sidebar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Basis from "@/components/ui/Basis"
import Money from "@/components/Money"


  export default {
    name: 'Mark',
    components:{
      Basis,
      Money
    },
    data(){
      return{
        point: false,
        visibleRight: false,

        cards:[
          {
            id:1,
            name: 'Репетун Макар',
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:3,
            name: 'Мухаметзянова Алина',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:1,
            name: 'Репетун Макар222',
            
          },
          {
            id:1,
            name: 'Репетун Макар 333',
            
          },
          {
            id:1,
            name: 'Репетун Макар',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:3,
            name: 'Мухаметзянова Алина',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:1,
            name: 'Репетун Макар222',
            
          },
          {
            id:1,
            name: 'Репетун Макар 333',
            
          },
          {
            id:1,
            name: 'Репетун Макар',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:3,
            name: 'Мухаметзянова Алина',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:2,
            name: 'Хузягулова Арина',
            
          },
          {
            id:1,
            name: 'Репетун Макар222',
            
          },
          {
            id:1,
            name: 'Репетун Макар 333',
            
          },
        ],

        

      }
    },
    methods:{

    toggleEl(){
      this.point = !this.point
    },

    ...mapActions(["GET_GROUPS"]),

    },
    computed: {
    ...mapGetters(["GROUPS"]),
  },
  mounted() {
    this.GET_GROUPS();
  },
    
  }
</script>

<style lang="scss" scoped>

.mark{
  height: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 5px;
}

// деньги
.money__client-name{
font-size: 20px;
font-weight: 700;
margin-bottom: 10px;
}




// панель выбора группы
.selectionGroup{
  width:15%;

}

.selectionGroup__header{
width: 100%;
height: 35px;
display: flex;
justify-content: flex-end;
align-items: center;
background-color: #2e3743;
padding: 10px;
column-gap: 10px;
}
.selectionGroup__header-icon{
width: 20px;
height: 20px;
cursor: pointer;
}
.group-wrapper{
  width: 100%;
  height: calc(100vh - 145px);
  overflow: auto;
}
.group-wrapper::-webkit-scrollbar{
  width: 0;
}
.group{
  padding: 10px;
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  margin-top: 5px;
  cursor: pointer;
}

.group__name{
font-size: 16px;
font-weight: 500;
}

// таблица

.mark__table{
  width:85%;

}

.mark__table-header{

  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.heart__header-group{
font-size: 20px;
font-weight: 500;

}
.heart__heder-month{
  font-weight: 500;
  font-size: 20px;
  border-bottom: 1px dashed black;
  cursor: pointer;
  padding: 3px;

}
.heart__header-loc{
  cursor: pointer;
}
.mark__table-table{
  width: 100%;
  height: 85%;
  overflow: auto;
}
.mark__table-table::-webkit-scrollbar{
  width: 0;
}

.LongCard{
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px;
  position: relative;
  margin-bottom: 5px;
}

.LongCard::after{
  content: "";
  display:block;
  position:absolute;
  width:10px;
  height:100%;
  top:0;
  left:0;
  background-color: red;

}
.LongCard__title{
  width:150px;
  font-size: 14px;
  font-weight: 600;
  color:rgb(75, 75, 75);
  margin-right: 30px;
  text-align: start;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}
.LongCard__list{
  display: flex;
}
.LongCard__list-item{
  width:30px;
  height: 40px;
  border-left: 1px solid rgb(212, 212, 212);
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.LongCard__list-item:last-child{
border-right:1px solid rgb(212, 212, 212) ;
}
.cardElem{
  position: absolute;
  right:10px;
  top:10px;
  display: flex;
  column-gap: 10px;
  align-items: center;
}
.pi-credit-card{
  cursor:pointer;
  font-size: 14px;
}
.pi-bolt{
  cursor:pointer;
}
.list-item__dot{
  display: block;
  border-radius: 100%;
  width: 11px;
  height: 11px;
  background-color: green;
}

.LongCard-numbers{
  background-color: #EDEDED;

}
.LongCard-numbers::after{
  background-color: #EDEDED;
}
.LongCard__list-item-numbers{
border:none;
font-size: 13px;
font-weight: 600;
text-align: center;
// border:1px solid red;
height: 30px;
}
.LongCard__list-item-numbers:last-child{
  border:none;
}

</style>