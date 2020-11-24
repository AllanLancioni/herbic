var app = new Vue({
  el: "#app",
  data: {
    modalidade: null,
    estadioCana: null,
    teorMatOrg: null,
    texturaSolo: null,
    epoca: null,
    varSensivel: 0,
    palha: 0,
    novaCultura: 0,
    incorp: 0,
    revolvimento: 0,
    areaRestrita: 0,
    plantioDias: 0,
    catacao: 0,
    BaixaPressaoEfMin: 80,
    MediaPressaoEfMin: 90,
    AltaPressaoEfMin: 95,
    eMinPos: 95,
    show: {
      estadioCana: false,
      teorMatOrg: false,
      texturaSolo: false,
      epoca: false,
      varSensivel: false,
      palha: false,
      novaCultura: false,
      incorp: false,
      revolvimento: false,
      areaRestrita: false,
      plantioDias: false,
      catacao: false,
    },
    matosArray: [],
    selectedMato: null,
    errors: [],
  },
  watch: {
    modalidade: function () {
      this.show.estadioCana = this.showWhen("ppi");
      this.show.teorMatOrg = this.showWhen(
        "ppi",
        "preMPB",
        "posMPB",
        "canaSoca",
        "canaPlanta",
        "quebraLombo",
        "sequencial",
        "dessecaDesinfesta"
      );
      this.show.texturaSolo = this.showWhen(
        "ppi",
        "preMPB",
        "posMPB",
        "canaSoca",
        "canaPlanta",
        "quebraLombo",
        "sequencial",
        "dessecaDesinfesta"
      );
      this.show.epoca = this.showWhen(
        "preMPB",
        "posMPB",
        "canaSoca",
        "canaPlanta",
        "quebraLombo",
        "sequencial"
      );
      this.show.estadioCana = this.showWhen("canaSoca", "canaPlanta");
      this.show.varSensivel = this.showWhen(
        "canaSoca",
        "canaPlanta",
        "quebraLombo",
        "sequencial"
      );
      this.show.palha = this.showWhen("canaSoca");
      this.show.novaCultura = this.showWhen("canaSoca", "sequencial");
      this.show.incorp = this.showWhen("ppi", "quebraLombo");
      this.show.revolvimento = this.showWhen("ppi", "canaPlanta");
      this.show.areaRestrita = this.showWhen(
        "ppi",
        "preMPB",
        "posMPB",
        "canaSoca",
        "canaPlanta",
        "dessecaDesinfesta"
      );
      this.show.plantioDias = this.showWhen("ppi", "dessecaDesinfesta");
      this.show.catacao = this.showWhen(
        "ppi",
        "preMPB",
        "posMPB",
        "canaSoca",
        "canaPlanta",
        "quebraLombo",
        "sequencial",
        "dessecaDesinfesta"
      );
    },
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      let foundCondition;
      if (this.catacao <= 0) {
        this.errors.push("Campo catação e Dias têm que ser maior que 0(zero).");
      }
      if (this.matosArray.length <= 0) {
        this.errors.push("Matologia: Pelo menos um mato deve ser selecionado.");
      }

      foundCondition = this.matosArray.find((mato) => !mato.pre && !mato.pos); 
      if (foundCondition) {
        this.errors.push(`Matologia - ${foundCondition.name}: É necessário selecionar um pré ou pós.`);
      }

      foundCondition = this.matosArray.find((mato) => mato.pre && !mato.pressao);
      if (foundCondition) {
        this.errors.push(`Matologia - ${foundCondition.name}: É necessário selecionar um pressão.`);
      }

      foundCondition = this.matosArray.find((mato) => mato.pre && !mato.pressao);
      if (foundCondition) {
        this.errors.push(`Matologia - ${foundCondition.name}: É necessário selecionar uma estádio.`);
      }


      foundCondition = 0;
      for (const item of Object.entries(this.show)){
        if (!item[1]) {
          this[item[0]] = "nao";
        } else if (!this[item[0]]) {
          foundCondition++;
        }  
      }

      if (foundCondition > 0) {
        this.errors.push(`Características da Área e do Plantio: Você possui ${foundCondition} campos não preenchidos.`);
      }

      if (this.errors.length > 0) {
        swal.fire({
          icon: "error",
          title: "Falha ao enviar formulário",
          html: this.errors.join("<br>"),
          timer: null
        });
        e.preventDefault();
        return;
      }
    },

    showWhen(...array) {
      return array.some((x) => this.modalidade === x);
    },

    addMato() {
      if(this.selectedMato == null) return
      if (this.matosArray.some((x) => this.selectedMato === x.name)) return;
      this.matosArray.push({
        name: this.selectedMato,
        pre: false,
        pos: false,
        pressao: null,
        estadio: null,
      });
    },
    removeMato(matoName) {
      this.matosArray.splice(
        this.matosArray.findIndex((x) => matoName === x.name),
        1
      );
    },
    resetMatos() {
      this.matosArray = []
    },

    setRadioPressao(selectedMato) {
      radios = document.getElementsByName("pressao_" + selectedMato);
      this.matosArray[
        this.matosArray.findIndex((mato) => mato.name === selectedMato)
      ].pressao = null;
      radios.forEach((radio) => {
        radio.checked = false;
        radio.disabled = !radio.disabled;
      });
    },
    setRadioEstadio(selectedMato) {
      radios = document.getElementsByName("estadio_" + selectedMato);
      this.matosArray[
        this.matosArray.findIndex((mato) => mato.name === selectedMato)
      ].estadio = null;
      radios.forEach((radio) => {
        radio.checked = false;
        radio.disabled = !radio.disabled;
      });
    },
  },
  computed: {
    checkPre: function () {
      return this.matosArray.some((x) => x.pre);
    },
    checkPos: function () {
      return this.matosArray.some((x) => x.pos);
    },
  },
});
