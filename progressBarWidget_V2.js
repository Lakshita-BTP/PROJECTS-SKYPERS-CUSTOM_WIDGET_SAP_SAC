(function () {

class ProgressBarWidget extends HTMLElement {

    constructor() {
        super();

        this._data = "[]";

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
        <style>

        .container{
            font-family:Arial;
            padding:10px;
        }

        .row{
            display:flex;
            align-items:center;
            margin-bottom:12px;
        }

        .label{
            width:180px;
            font-size:12px;
            font-weight:bold;
        }

        .bar-container{
            flex:1;
            height:28px;
            background:#e5e5e5;
            border-radius:4px;
            overflow:hidden;
        }

        .bar{
            height:100%;
            color:white;
            display:flex;
            align-items:center;
            padding-left:10px;
            font-size:12px;
            font-weight:bold;
        }

        </style>

        <div id="container"></div>
        `;
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
        if (changedProperties.data) {
            this._data = changedProperties.data;
        }
    }

    onCustomWidgetAfterUpdate() {
        this.render();
    }

    render() {

        var container =
            this.shadowRoot.getElementById("container");

        var data = [];

        try {
            data = JSON.parse(this._data);
        } catch (e) {
            container.innerHTML = "Invalid JSON";
            return;
        }

        if (data.length === 0) {
            container.innerHTML = "No Data";
            return;
        }

        var maxValue = 0;

        data.forEach(function(item){
            if(item.value > maxValue){
                maxValue = item.value;
            }
        });

        var html = "";

        data.forEach(function(item){

            var width =
                (item.value / maxValue) * 100;

            html += `
            <div class="row">

                <div class="label">
                    ${item.entity}
                </div>

                <div class="bar-container">
                    <div class="bar"
                        style="
                        width:${width}%;
                        background:${item.color};">
                        ${item.value}
                    </div>
                </div>

            </div>
            `;
        });

        container.innerHTML = html;
    }
}

customElements.define(
    "com-max-progressbar",
    ProgressBarWidget
);

})();