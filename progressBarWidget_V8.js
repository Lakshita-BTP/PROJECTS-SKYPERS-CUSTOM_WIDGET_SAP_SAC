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
            width:130px;
            font-size:12px;
            font-weight:bold;
            color:#6b7d99;
            line-height:14px;
            word-break:break-word;
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
            width:70px;
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

            <div id="content">
                Waiting for Data Binding...
            </div>
        </div>
        `;
    }

    connectedCallback() {
      this.render();
    }

    set myDataBinding(dataBinding) {
      this._myDataBinding = dataBinding;
      this.render();
    }

    render() {
      const content = this.shadowRoot.getElementById("content");

      if (!this._myDataBinding) {
        content.innerHTML = "No Data Binding Assigned";
        return;
      }

      if (this._myDataBinding.state !== "success") {
        content.innerHTML = "Loading Data...";
        return;
      }

      try {
        const dimension =
          this._myDataBinding.metadata.feeds.dimensions.values[0];

        const measure = this._myDataBinding.metadata.feeds.measures.values[0];

        const data = this._myDataBinding.data.map((row) => ({
          name: row[dimension].label,
          value: Number(row[measure].raw),
        }));

        if (data.length === 0) {
          content.innerHTML = "No Data Found";
          return;
        }

        const totalValue = data.reduce((sum, item) => sum + item.value, 0);

        const colors = ["#344f6d", "#f08a3c", "#d4b06a", "#9fb2c6", "#5b7c99"];

        let html = "";

        data.forEach((item, index) => {
          const percent =
            totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(1) : 0;
          
          const valueCr = item.value;

          html += `
            <div class="row">

              <div class="label">
                ${item.name}
              </div>

              <div class="bar-container">
                <div
                  class="bar"
                  style="
                    width:${percent}%;
                    background:${colors[index % colors.length]};
                  ">
                  ${percent}%
                </div>
              </div>

              <div class="value">
                ${valueCr.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} Cr
              </div>

            </div>
          `;
        });

        content.innerHTML = html;
      } catch (e) {
        content.innerHTML = "<pre>Error: " + e.message + "</pre>";

        console.error(e);
      }
    }
  }

  customElements.define("com-max-progressbar", ProgressBarWidget);
})();
