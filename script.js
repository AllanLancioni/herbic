var app = new Vue({
  el: "#app",
  data: {
    modalidade: null,
    estadioCana: 0,
    teorMatOrg: 0,
    texturaSolo: 0,
    epoca: 0,
    estadioCana: 0,
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
      modalidade: false,
      estadioCana: false,
      teorMatOrg: false,
      texturaSolo: false,
      epoca: false,
      estadioCana: false,
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
    matos: ["Mato1", "Mato2"],
    errors: [],
  },
  watch: {
    modalidade: function (val) {
      (this.show.estadioCana = this.showWhen("ppi")),
        (this.show.teorMatOrg = this.showWhen(
          "ppi",
          "preMPB",
          "posMPB",
          "canaSoca",
          "canaPlanta",
          "quebraLombo",
          "sequencial",
          "dessecaDesinfesta"
        )),
        (this.show.texturaSolo = this.showWhen(
          "ppi",
          "preMPB",
          "posMPB",
          "canaSoca",
          "canaPlanta",
          "quebraLombo",
          "sequencial",
          "dessecaDesinfesta"
        )),
        (this.show.epoca = this.showWhen(
          "preMPB",
          "posMPB",
          "canaSoca",
          "canaPlanta",
          "quebraLombo",
          "sequencial"
        )),
        (this.show.estadioCana = this.showWhen("canaSoca", "canaPlanta")),
        (this.show.varSensivel = this.showWhen(
          "canaSoca",
          "canaPlanta",
          "quebraLombo",
          "sequencial"
        )),
        (this.show.palha = this.showWhen("canaSoca")),
        (this.show.novaCultura = this.showWhen("canaSoca", "sequencial")),
        (this.show.incorp = this.showWhen("ppi", "quebraLombo")),
        (this.show.revolvimento = this.showWhen("ppi", "canaPlanta")),
        (this.show.areaRestrita = this.showWhen(
          "ppi",
          "preMPB",
          "posMPB",
          "canaSoca",
          "canaPlanta",
          "dessecaDesinfesta"
        )),
        (this.show.plantioDias = this.showWhen("ppi", "dessecaDesinfesta")),
        (this.show.catacao = this.showWhen(
          "ppi",
          "preMPB",
          "posMPB",
          "canaSoca",
          "canaPlanta",
          "quebraLombo",
          "sequencial",
          "dessecaDesinfesta"
        ));
    },
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      this.errors = [];
      if (this.catacao <= 0 || this.plantioDias <= 0) {
        this.errors.push("Campo catação e Dias têm que ser maior que 0(zero).");
      }
      if (this.matosArray.length <= 0) {
        this.errors.push("Pelo menos um mato deve ser selecionado.");
      }

      if(!this.matosArray.some(mato => mato.pressao || mato.estadio)){
        this.errors.push("É necessário selecionar uma pressão ou estádio.")
      }
      swal.fire({
        icon: 'error',
        title: 'Falha ao enviar formulário',
        text: this.errors.join(' '),
      })
    },

    showWhen(...array) {
      return array.some((x) => this.modalidade === x);
    },

    addMato() {
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
