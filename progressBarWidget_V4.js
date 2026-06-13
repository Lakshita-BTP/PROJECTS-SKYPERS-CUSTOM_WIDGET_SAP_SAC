(function () {
  class ProgressBarWidget extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this.shadowRoot.innerHTML = `
        <style>

        .container{
            font-family: Arial, sans-serif;
            padding:15px;
        }

        .title{
            font-size:18px;
            font-weight:bold;
            margin-bottom:20px;
            color:#1b2a41;
        }

        .row{
            display:flex;
            align-items:center;
            margin-bottom:15px;
        }

        .label{
            width:180px;
            font-size:12px;
            font-weight:bold;
            color:#6b7d99;
        }

        .bar-container{
            flex:1;
            height:28px;
            background:#e7e3df;
            border-radius:4px;
            overflow:hidden;
            margin-right:10px;
        }

        .bar{
            height:100%;
            display:flex;
            align-items:center;
            padding-left:10px;
            color:white;
            font-size:12px;
            font-weight:bold;
            border-radius:4px;
            box-sizing:border-box;
        }

        .value{
            width:90px;
            text-align:right;
            font-size:13px;
            color:#1b2a41;
            font-weight:bold;
        }

        </style>

        <div class="container">
            <div class="title">
                BUSINESS ENTITY WISE BILLING
            </div>

            <div id="content"></div>
        </div>
        `;
    }

    connectedCallback() {
      this.shadowRoot.getElementById("content").innerHTML =
        "Waiting for Data Binding...";
    }

    onCustomWidgetAfterUpdate() {
      try {
        var binding = this.dataBindings.getDataBinding("myDataBinding");

        if (!binding) {
          this.shadowRoot.getElementById("content").innerHTML =
            "No Data Binding";
          return;
        }

        var rs = binding.getDataSource().getResultSet();

        this.shadowRoot.getElementById("content").innerHTML =
          "<pre>" + JSON.stringify(rs, null, 2) + "</pre>";
      } catch (e) {
        this.shadowRoot.getElementById("content").innerHTML =
          "Error: " + e.message;
      }
    }
  }

  customElements.define("com-max-progressbar", ProgressBarWidget);
})();
