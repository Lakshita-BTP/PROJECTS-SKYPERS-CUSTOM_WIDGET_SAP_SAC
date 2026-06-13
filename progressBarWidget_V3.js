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
        this.render();
    }

    render() {

        var data = [
            {
                entity: "Max 128 Pvt. Ltd",
                value: 1173,
                color: "#27496d"
            },
            {
                entity: "Max Gurgaon Ltd",
                value: 1965,
                color: "#f28c38"
            },
            {
                entity: "Max Gurgaon Two",
                value: 291,
                color: "#d4b06a"
            },
            {
                entity: "Boulevard Project",
                value: 940,
                color: "#9fa9b3"
            },
            {
                entity: "Max Noida",
                value: 940,
                color: "#49617a"
            }
        ];

        var maxValue = 0;

        data.forEach(function(item){
            if(item.value > maxValue){
                maxValue = item.value;
            }
        });

        var html = "";

        data.forEach(function(item){

            var width = (item.value / maxValue) * 100;

            html += `
            <div class="row">

                <div class="label">
                    ${item.entity}
                </div>

                <div class="bar-container">

                    <div class="bar"
                        style="
                            width:${width}%;
                            background:${item.color};
                        ">
                        ${item.value} Cr
                    </div>

                </div>

                <div class="value">
                    ${item.value} Cr
                </div>

            </div>
            `;
        });

        this.shadowRoot.getElementById("content").innerHTML = html;
    }
}

customElements.define(
    "com-max-progressbar",
    ProgressBarWidget
);

})();