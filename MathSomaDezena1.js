export default {
    name:'MathSomaDezena1',
    // el:"#app",
    data(){
        return{

            vueTeste:"Esse é um teste vue",
            completeItem:[
                {a:0, b:0, c:0, d:"", e:"",f:false},
                {a:0, b:0, c:0, d:"", e:"",f:false},
                {a:0, b:0, c:0, d:"", e:"",f:false},
                {a:0, b:0, c:0, d:"", e:"",f:false},
                {a:0, b:0, c:0, d:"", e:"",f:false},
                {a:0, b:0, c:0, d:"", e:"",f:false},
                {a:0, b:0, c:0, d:"", e:"",f:false},
                {a:0, b:0, c:0, d:"", e:"",f:false},
                {a:0, b:0, c:0, d:"", e:"",f:false},
                {a:0, b:0, c:0, d:"", e:"",f:false}      
            ],
          lux:0,  
          itemQuestion:"",
          postive:0,
          negative:0,
          disable:false,
          count:1,
          seg:0,
          avaliationScreem:0
        }
        
    },
    template:`   <div class="main_content">
    <h1>Somar 2/10</h1>
    <div class="content" v-for="(item, index) in completeItem" :key="index">
        <div class="coeficientes">
            <p>{{item.a}}</p>
            <p>+</p>
            <p>{{item.b}}</p>
            <p>=</p>
        </div>
        <input  :disabled="item.f" class="" :class="item.e" type="number" v-model="completeItem[index].d" @change="ReadingResult(index)"/>  
        <p v-if="item.d===false" style="color:red; min-width: 160px;">O resultado correto é {{item.c}}</p>            
    </div>      
    <div class="result" v-if="count > 10">
        <p>Acertos {{postive}}</p>
        <p>Erros {{negative}}</p>
        <p>Sua nota é {{avaliationScreem}} {{showAvaliation()}}</p>
    </div> 
    <p class="tempo">Feito {{seg}} Segundos</p>

</div>`,
    methods:{
     showExerciceForEach(){
         this.completeItem.map((item) => {       
            item.a = Math.floor(Math.random() * 40)
            item.b = Math.floor(Math.random() * 40)
            item.c =item.a + item.b            
         })       
     },
     ReadingResult(index){   
            finishTest:0
        if(this.completeItem[index].a + this.completeItem[index].b == parseInt(this.completeItem[index].d)){           
            this.completeItem[index].e = "corectItem"
            this.completeItem[index].d = true
            this.postive++
        }else{           
            this.completeItem[index].e = "incorectItem"
            this.completeItem[index].d = false
            this.negative++
        }
        this.completeItem[index].f = true;     
        this.count++
        if(this.seg==0){
            this.countTime()

        }
        if(this.count>10){
            clearInterval(this.finish)
            this.finalEvaluation()
        }
     },

     countTime(){
      this.finish =  setInterval(()=>{
        this.seg++
        },1000)
     },
     finalEvaluation(){         
         let timeCurrent = 0;
       let firstNote =    this.postive * .5
     
        if(this.seg < 25){
            timeCurrent = 5
        }
        else if(this.seg < 30){
            timeCurrent = 4
        }
        else if(this.seg < 40){
            timeCurrent = 3
        }
        else if(this.seg < 50){
            timeCurrent = 2
        }
        else if(this.seg < 55){
            timeCurrent = 1
        }else{
            timeCurrent = 0
        }
        this.avaliationScreem = timeCurrent + firstNote 
        this.showAvaliation()
    }, 

    showAvaliation(){
        if(this.postive<5){
            return "Voce precisa voltar ao papel e caneta antes de tentar esse nível"
        }
        if(this.avaliationScreem<=3){
           return "Precisa praticar mais"
       }
       if(this.avaliationScreem<=5){
        return "Está quase acima da média"
        }
        if(this.avaliationScreem<=7){
            return "Seu desempenho é regular"
        }
        if(this.avaliationScreem<9){
            return "Você já pode tentar um exercício mais difícil"
        }
        if(this.avaliationScreem<=10){
            return "Você já chegou ao ponto máximo desse nível"
        }
    }
     
    },
    computed:{
        res(){
           return (this.itemQuestion ? "corectItem" : "incorectItem")       
    }
},
    mounted: function (){      
        this.showExerciceForEach()
        console.log(this.completeItem)
    }
}
      
       
