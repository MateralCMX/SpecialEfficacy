namespace IonClock
{
    export class IndexPage
    {
        /**
         * 离子钟对象
         */
        private static _IonClock: MateralSpecialEfficacy.IonClock;
        /**
         * 构造方法
         */
        constructor()
        {
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
        private BindEvent()
        {
            let InputColor = document.$("InputColor") as HTMLInputElement;
            if (InputColor)
            {
                InputColor.addEventListener("change", this.Event_InputColor_Change);
            }
            let InputBackgroundColor = document.$("InputBackgroundColor") as HTMLInputElement;
            if (InputBackgroundColor)
            {
                InputBackgroundColor.addEventListener("change", this.Event_InputBackgroundColor_Change);
            }
            let InputFontSize = document.$("InputFontSize") as HTMLInputElement;
            if (InputFontSize)
            {
                InputFontSize.addEventListener("change", this.Event_InputFontSize_Change);
            }
            let InputLineWidth = document.$("InputLineWidth") as HTMLInputElement;
            if (InputLineWidth)
            {
                InputLineWidth.addEventListener("change", this.Event_InputLineWidth_Change);
            }
            let InputShadowBlur = document.$("InputShadowBlur") as HTMLInputElement;
            if (InputShadowBlur)
            {
                InputShadowBlur.addEventListener("change", this.Event_InputShadowBlur_Change);
            }
            let InputIsAsc = document.$("InputIsAsc") as HTMLInputElement;
            if (InputIsAsc)
            {
                InputIsAsc.addEventListener("change", this.Event_InputIsAsc_Change);
            }
            let BtnStartOrStop = document.$("BtnStartOrStop") as HTMLButtonElement;
            if (BtnStartOrStop)
            {
                BtnStartOrStop.addEventListener("click", this.Event_BtnStartOrStop_Click);
            }
        }
        /**
         * 更改颜色事件
         * @param e
         */
        private Event_InputColor_Change(e: Event)
        {
            let element = e.MGetEventTarget() as HTMLInputElement;
            IndexPage._IonClock.Config.Color = element.value;
        }
        /**
         * 更改背景颜色事件
         * @param e
         */
        private Event_InputBackgroundColor_Change(e: Event)
        {
            let element = e.MGetEventTarget() as HTMLInputElement;
            IndexPage._IonClock.Config.BackgroundColor = element.value;
            window.document.body.style.backgroundColor = element.value;
        }
        /**
         * 更改字号
         * @param e
         */
        private Event_InputFontSize_Change(e: Event)
        {
            let element = e.MGetEventTarget() as HTMLInputElement;
            IndexPage._IonClock.Config.FontSize = parseInt(element.value);
            let LabelFontSize = document.$("LabelFontSize") as HTMLLabelElement;
            if (LabelFontSize)
            {
                LabelFontSize.innerText = "字号(" + element.value + ")";
            }
        }
        /**
         * 更改线宽
         * @param e
         */
        private Event_InputLineWidth_Change(e: Event)
        {
            let element = e.MGetEventTarget() as HTMLInputElement;
            IndexPage._IonClock.Config.LineWidth = parseInt(element.value);
            let LabelLineWidth = document.$("LabelLineWidth") as HTMLLabelElement;
            if (LabelLineWidth)
            {
                LabelLineWidth.innerText = "线宽(" + element.value + ")";
            }
        }
        /**
         * 更改阴影
         * @param e
         */
        private Event_InputShadowBlur_Change(e: Event)
        {
            let element = e.MGetEventTarget() as HTMLInputElement;
            IndexPage._IonClock.Config.ShadowBlur = parseInt(element.value);
            let LabelShadowBlur = document.$("LabelShadowBlur") as HTMLLabelElement;
            if (LabelShadowBlur)
            {
                LabelShadowBlur.innerText = "阴影(" + element.value + ")";
            }
        }
        /**
         * 更改排序
         * @param e
         */
        private Event_InputIsAsc_Change(e: Event)
        {
            let element = e.MGetEventTarget() as HTMLInputElement;
            IndexPage._IonClock.Config.IsAsc = element.checked;
        }
        /**
         * 开始按钮
         * @param e
         */
        private Event_BtnStartOrStop_Click(e: Event)
        {
            let element = e.MGetEventTarget() as HTMLButtonElement;
            if (IndexPage._IonClock.IsDraw)
            {
                IndexPage._IonClock.StopDraw();
                element.innerText = "开始";
            }
            else
            {
                IndexPage._IonClock.StartDraw();
                element.innerText = "停止";
            }
        }
    }
}
window.addEventListener("load", function (e: Event)
{
    let pageM = new IonClock.IndexPage();
});