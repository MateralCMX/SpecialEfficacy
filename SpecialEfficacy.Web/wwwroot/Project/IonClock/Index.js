var IonClock;
(function (IonClock) {
    var IndexPage = /** @class */ (function () {
        /**
         * 构造方法
         */
        function IndexPage() {
            this.BindEvent();
            IndexPage._IonClock = new MateralSpecialEfficacy.IonClock("canvas", {
                Color: "#2888d7",
                BackgroundColor: "#000",
                FontFamily: "Microsoft YaHei",
                FontSize: 18,
                LineWidth: 17,
                ShadowBlur: 15,
                IsAsc: true
            });
            IndexPage._IonClock.StartDraw();
        }
        /**
         * 绑定事件
         */
        IndexPage.prototype.BindEvent = function () {
            var InputColor = document.$("InputColor");
            if (InputColor) {
                InputColor.addEventListener("change", this.Event_InputColor_Change);
            }
            var InputBackgroundColor = document.$("InputBackgroundColor");
            if (InputBackgroundColor) {
                InputBackgroundColor.addEventListener("change", this.Event_InputBackgroundColor_Change);
            }
            var InputFontSize = document.$("InputFontSize");
            if (InputFontSize) {
                InputFontSize.addEventListener("change", this.Event_InputFontSize_Change);
            }
            var InputLineWidth = document.$("InputLineWidth");
            if (InputLineWidth) {
                InputLineWidth.addEventListener("change", this.Event_InputLineWidth_Change);
            }
            var InputShadowBlur = document.$("InputShadowBlur");
            if (InputShadowBlur) {
                InputShadowBlur.addEventListener("change", this.Event_InputShadowBlur_Change);
            }
            var InputIsAsc = document.$("InputIsAsc");
            if (InputIsAsc) {
                InputIsAsc.addEventListener("change", this.Event_InputIsAsc_Change);
            }
            var BtnStartOrStop = document.$("BtnStartOrStop");
            if (BtnStartOrStop) {
                BtnStartOrStop.addEventListener("click", this.Event_BtnStartOrStop_Click);
            }
        };
        /**
         * 更改颜色事件
         * @param e
         */
        IndexPage.prototype.Event_InputColor_Change = function (e) {
            var element = e.MGetEventTarget();
            IndexPage._IonClock.Config.Color = element.value;
        };
        /**
         * 更改背景颜色事件
         * @param e
         */
        IndexPage.prototype.Event_InputBackgroundColor_Change = function (e) {
            var element = e.MGetEventTarget();
            IndexPage._IonClock.Config.BackgroundColor = element.value;
            window.document.body.style.backgroundColor = element.value;
        };
        /**
         * 更改字号
         * @param e
         */
        IndexPage.prototype.Event_InputFontSize_Change = function (e) {
            var element = e.MGetEventTarget();
            IndexPage._IonClock.Config.FontSize = parseInt(element.value);
            var LabelFontSize = document.$("LabelFontSize");
            if (LabelFontSize) {
                LabelFontSize.innerText = "字号(" + element.value + ")";
            }
        };
        /**
         * 更改线宽
         * @param e
         */
        IndexPage.prototype.Event_InputLineWidth_Change = function (e) {
            var element = e.MGetEventTarget();
            IndexPage._IonClock.Config.LineWidth = parseInt(element.value);
            var LabelLineWidth = document.$("LabelLineWidth");
            if (LabelLineWidth) {
                LabelLineWidth.innerText = "线宽(" + element.value + ")";
            }
        };
        /**
         * 更改阴影
         * @param e
         */
        IndexPage.prototype.Event_InputShadowBlur_Change = function (e) {
            var element = e.MGetEventTarget();
            IndexPage._IonClock.Config.ShadowBlur = parseInt(element.value);
            var LabelShadowBlur = document.$("LabelShadowBlur");
            if (LabelShadowBlur) {
                LabelShadowBlur.innerText = "阴影(" + element.value + ")";
            }
        };
        /**
         * 更改排序
         * @param e
         */
        IndexPage.prototype.Event_InputIsAsc_Change = function (e) {
            var element = e.MGetEventTarget();
            IndexPage._IonClock.Config.IsAsc = element.checked;
        };
        /**
         * 开始按钮
         * @param e
         */
        IndexPage.prototype.Event_BtnStartOrStop_Click = function (e) {
            var element = e.MGetEventTarget();
            if (IndexPage._IonClock.IsDraw) {
                IndexPage._IonClock.StopDraw();
                element.innerText = "开始";
            }
            else {
                IndexPage._IonClock.StartDraw();
                element.innerText = "停止";
            }
        };
        return IndexPage;
    }());
    IonClock.IndexPage = IndexPage;
})(IonClock || (IonClock = {}));
window.addEventListener("load", function (e) {
    var pageM = new IonClock.IndexPage();
});
//# sourceMappingURL=Index.js.map