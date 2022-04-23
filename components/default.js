export default {
  name: "MathSomaUnidade",
  //el:"#app",
  template: `  
   <div class="main_content">
    <div class="frontButtonWrapper">
    <button @click="redefiningGameScreen">Recomeçar</button>
    <button @click="backToMainMenu">Menu de Exercícios</button>
    </div>
        <h1 @click="liberaProximosExercicios">{{title}}</h1>   

        <div class="content" v-for="(item, index) in completeItem" :key="index">
            <div class="coeficientes">
                <p>{{item.firstValue}}</p>
                <p>{{signal}}</p>
                <p>{{item.secondValue}}</p>
                <p>=</p>
            </div>
            <input  :disabled="item.enabling" class="" :class="item.confirmClass" type="number" v-model="completeItem[index].writtenRestult"/>  
            <button v-if="item.writtenRestult!==false" @click="ReadingResult(index)" style="color:green">{{ item.Label }}</button>
            <p v-if="item.writtenRestult===false" style="color:red; min-width: 160px;">O resultado correto é {{item.result}}</p>            
        </div>      
        <div class="result" v-if="count > 10">
            <p class="evaluation_grade">Sua nota é <span>{{avaliationScreem}}</span></p>
            <p class="evaluation_description">{{evaluationMessaage}}</p>
            <p class="postive_notes"> Acertos {{positive}}</p> 
            <p class="negative_notes"> Erros {{negative}}</p>
        </div> 
        <p class="tempo">Feito {{seg}} Segundos</p>      
        </div>`,
  data() {
    return {
      vueTeste: "Esse é um teste vue",
      completeItem: [],
      lux: 0,
      itemQuestion: "Eu quero uma string",
      evaluationMessaage: "",
      positive: 0,
      negative: 0,
      //perpetou: this.reset,
      disable: false,
      partial_answer: "1243",
      count: 1,
      seg: 0,
      avaliationScreem: 0,
      //mathSomaDezena: 0,
      liberaTela: 0,
    }
  },
  props: [
    "primeira_variavel_numerica",
    "segundo_limite",
    "terceiro_limite",
    "libera_exercicio",
    "title",
    "reset",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "signal",
    "polivariaveis",
    "call_reset",
    "number_exercices_repetition",
  ],
  methods: {
    createNumberExercicesRepetition() {
      let indexWhile = 0
      while (indexWhile < this.number_exercices_repetition) {
        indexWhile++
        this.completeItem.push({
          firstValue: 0,
          secondValue: 0,
          result: 0,
          writtenRestult: "",
          confirmClass: "",
          enabling: false,
          Label: "Enviar",
        })
      }
    },
    showExerciceForEach() {
      if (this.polivariaveis === 1) {
        this.completeItem.map(item => {
          item.firstValue = Math.floor(Math.random() * this.primeira_variavel_numerica)
          item.secondValue = Math.floor(Math.random() * this.primeira_variavel_numerica)
          item.result = item.firstValue + item.secondValue
        })
      }
      if (this.polivariaveis === 2) {
        this.completeItem.map(item => {
          item.firstValue =
            Math.floor(Math.random() * (this.segundo_limite - this.terceiro_limite)) + this.terceiro_limite
          item.secondValue = Math.floor(Math.random() * this.primeira_variavel_numerica)
          item.result = this.verificaEval(item.firstValue, this.signal, item.secondValue)
        })
      }
      if (this.polivariaveis === 3) {
        this.completeItem.map(item => {
          item.firstValue = this.primeira_variavel_numerica
          item.secondValue = Math.floor(Math.random() * this.segundo_limite)
          item.result = item.firstValue * item.secondValue
        })
      }
      if (this.polivariaveis === 4) {
        this.completeItem.map(item => {
          item.firstValue = this.primeira_variavel_numerica
          item.secondValue =
            Math.floor(Math.random() * (this.segundo_limite - this.terceiro_limite)) + this.terceiro_limite
          item.result = item.firstValue * item.secondValue
        })
      }
    },
    verificaEval(value1, operation, value2) {
      let op = {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "/": (x, y) => x / y,
        "*": (x, y) => x * y,
      }
      return op[operation](value1, value2)
    },
    ReadingResult(index) {
      if (
        this.verificaEval(this.completeItem[index].firstValue, this.signal, this.completeItem[index].secondValue) ==
        parseInt(this.completeItem[index].writtenRestult)
      ) {
        this.completeItem[index].confirmClass = "corectItem"
        this.completeItem[index].writtenRestult = true
        this.completeItem[index].Label = "Resposta Correta"
        this.positive++
      } else {
        this.completeItem[index].confirmClass = "incorectItem"
        this.completeItem[index].writtenRestult = false
        this.completeItem[index].Label = ""
        this.negative++
      }
      this.completeItem[index].enabling = true
      this.count++
      if (this.seg == 0) {
        this.countTime()
      }
      if (this.count > 10) {
        clearInterval(this.finish)
        this.finalEvaluation()
      }
    },

    countTime() {
      this.finish = setInterval(() => {
        this.seg++
      }, 1000)
    },
    finalEvaluation() {
      let timeCurrent = 0
      let firstNote = this.positive * 0.5

      if (this.seg < this.first) {
        timeCurrent = 5
      } else if (this.seg < this.second) {
        timeCurrent = 4
      } else if (this.seg < this.third) {
        timeCurrent = 3
      } else if (this.seg < this.fourth) {
        timeCurrent = 2
      } else if (this.seg < this.fifth) {
        timeCurrent = 1
      } else {
        timeCurrent = 0
      }
      this.avaliationScreem = timeCurrent + firstNote
      this.showAvaliation()
    },

    showAvaliation() {
      debugger
      if (this.positive < 5) {
        this.evaluationMessaage = "Voce precisa voltar ao papel e caneta antes de tentar esse nível"
        this.closeMessage()
      }
      if (this.avaliationScreem>=5 && this.avaliationScreem < 6) {
        this.evaluationMessaage = "Precisa praticar mais"
         this.closeMessage()
      }
      if (this.avaliationScreem>=6 && this.avaliationScreem < 7) {
        this.evaluationMessaage= "Está quase acima da média"
        this.closeMessage()
      }
      if (this.avaliationScreem>=7 && this.avaliationScreem < 8) {
        this.evaluationMessaage="Seu desempenho é regular"
        this.closeMessage()

      }
      if (this.avaliationScreem>=8 && this.avaliationScreem < 9) {
        this.evaluationMessaage = "Você já pode tentar um exercício mais difícil"
        this.closeMessage()

        this.liberaProximosExercicios()
      }
      if (this.avaliationScreem > 9) {
        this.evaluationMessaage = "Você já pode tentar um exercício mais difícil"
        this.closeMessage()
         this.liberaProximosExercicios()
      }
    },

    closeMessage() {
      setTimeout(() => {
        this.count = 0
      }, 3000)
      return
    },
    liberaProximosExercicios() {
      // this.mathSomaDezena = true
      this.$emit("liberaexercicio", this.libera_exercicio)
    },

    backToMainMenu() {
      this.$emit("backtomainmenu", false)
    },

    redefiningGameScreen() {
      this.showExerciceForEach()
      for (let i = 0; i < this.completeItem.length; i++) {
        this.completeItem[i].confirmClass = ""
        this.completeItem[i].writtenRestult = ""
        this.completeItem[i].enabling = false
        this.completeItem[i].Label = "Enviar"
      }
      this.avaliationScreem = ""
      clearInterval(this.finish)
      this.seg = 0
      this.count = 1
      this.positive = 0
      this.negative = 0
    },
  },

  computed: {
    res() {
      return this.itemQuestion ? "corectItem" : "incorectItem"
    },
    sinal() {
      this.signal === "+" ? "+" : "-"
    },
  },
  watch: {
    call_reset() {
      this.redefiningGameScreen()
    },
  },
  mounted: function () {
    this.createNumberExercicesRepetition()
    this.redefiningGameScreen()
    console.log(this.completeItem)
  },
}
