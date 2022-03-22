export default {
    name:'MathSomaUnidade',
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
    <button @click="reset">Recomeçar</button>
    <h1 @click="liberaProximosExercicios">Tabuada do 3 primeira parte</h1>
    <div class="content" v-for="(item, index) in completeItem" :key="index">
        <div class="coeficientes">
            <p>{{item.a}}</p>
            <p>X</p>
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
            item.a = 3;
            item.b = Math.floor(Math.random() * 5)
            item.c =item.a * item.b            
         })       
     },
     ReadingResult(index){   
            finishTest:0
        if(this.completeItem[index].a * this.completeItem[index].b == parseInt(this.completeItem[index].d)){           
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
     
       if(this.seg < 35){
        timeCurrent = 5
    }
    else if(this.seg < 40){
        timeCurrent = 4
    }
    else if(this.seg < 45){
        timeCurrent = 3
    }
    else if(this.seg < 50){
        timeCurrent = 2
    }
    else if(this.seg < 60){
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
            this.liberaProximosExercicios()
            return "Você já pode tentar um exercício mais difícil"
        }
        if(this.avaliationScreem<=10){
            this.liberaProximosExercicios()
            return "Você já chegou ao ponto máximo desse nível"
        }
    },
    
    liberaProximosExercicios(){
        this.mathSomaDezena=true      
        this.$emit("liberaexercicio",6)
    },
    reset(){
        this.showExerciceForEach()
       for(let i = 0; i<this.completeItem.length;i++){
        this.completeItem[i].e = ""
        this.completeItem[i].d = ""
        this.completeItem[i].f = false
       }
       this.avaliationScreem =""
       clearInterval(this.finish)
       this.seg=0
       this.count=1
       this.postive=0
       this.negative=0
    }
     
    },
    computed:{
        res(){
           return (this.itemQuestion ? "corectItem" : "incorectItem")       
    }
},
    mounted: function (){      
        this.showExerciceForEach()        
    }
}
      
       
