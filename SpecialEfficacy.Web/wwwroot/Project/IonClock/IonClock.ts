namespace MateralSpecialEfficacy
{
    export class IonClock
    {
        /*
         * 本体
         */
        private static _this: IonClock;
        /**
         * 画布
         */
        private _canvas: HTMLCanvasElement;
        /**
         * 画笔
         */
        private _ctx: CanvasRenderingContext2D;
        /**
         * 直径
         */
        private _diameter: number;
        /**
         * 绘制标识
         */
        private _isDraw: boolean = false;
        /**
         * 绘制标识
         */
        public get IsDraw(): boolean
        {
            return this._isDraw;
        }
        private _centerPointXY: number;
        private _endAngle: number;
        /**
         * 配置
         */
        public Config: IonClockConfigModel;
        /**
         * 构造方法
         * @param canvasID 画布ID
         * @param color 颜色
         * @param backgroundColor 背景颜色
         */
        constructor(canvasID: string, config: IonClockConfigModel)
        {
            IonClock._this = this;
            this.Config = config;
            this._canvas = document.getElementById(canvasID) as HTMLCanvasElement;
            if (this._canvas)
            {
                this._diameter = this._canvas.width > this._canvas.height ? this._canvas.height : this._canvas.width;
                this._centerPointXY = this._diameter / 2;
                this._endAngle = this.DegToRad(270);
                this._ctx = this._canvas.getContext("2d");
            }
            else
            {
                throw "未能找到对应画布，请检查是否拥有ID为" + canvasID + "的<canvas>元素";
            }
        }
        /**
         * 绘制
         */
        private Draw(): void
        {
            let dateM: IonClockDateTimeModel = new IonClockDateTimeModel();
            IonClock._this.DrawBackground();
            IonClock._this.InitCtx();
            IonClock._this.DrawDateText(dateM.DateStr);
            IonClock._this.DrawTimeText(dateM.TimeStr);
            if (IonClock._this.Config.IsAsc)
            {
                IonClock._this.DrawInner(dateM.Seconds, 60);
                IonClock._this.DrawOuter(dateM.Hours, 12);
            }
            else
            {
                IonClock._this.DrawInner(dateM.Hours, 12);
                IonClock._this.DrawOuter(dateM.Seconds, 60);
            }
            IonClock._this.DrawMiddle(dateM.Minutes, 60);
            if (IonClock._this._isDraw)
            {
                requestAnimationFrame(IonClock._this.Draw);
            }
        }
        /**
         * 初始化画笔
         */
        private InitCtx()
        {
            this._ctx.lineWidth = this.Config.LineWidth;
            this._ctx.font = this.Config.FontSize + "px " + this.Config.FontFamily;
            this._ctx.strokeStyle = this.Config.Color;
            this._ctx.shadowColor = this.Config.Color;
            this._ctx.fillStyle = this.Config.Color;
            this._ctx.shadowBlur = this.Config.ShadowBlur;
        }
        /** 
         * 开始绘制
         */
        public StartDraw(): void
        {
            this._isDraw = true;
            this.Draw();
        }
        /**
         * 停止绘制 
         */
        public StopDraw(): void
        {
            this._isDraw = false;
        }
        /**
         * 绘制背景
         */
        private DrawBackground(): void
        {
            this._ctx.fillStyle = this.Config.BackgroundColor;
            this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        }
        /**
         * 绘制日期文本
         * @param dateText 日期文本
         */
        private DrawDateText(dateText: string): void
        {
            let textwidth = this._ctx.measureText(dateText).width;
            let x = this._diameter * 0.5 - textwidth / 2;
            let y = this._diameter * 0.5 - this.Config.FontSize / 2;
            this._ctx.fillText(dateText, x, y, this._diameter);
        }
        /**
         * 绘制时间文本
         * @param timeText 时间文本
         */
        private DrawTimeText(timeText: string): void
        {
            let textwidth = this._ctx.measureText(timeText).width;
            let x = this._diameter * 0.5 - textwidth / 2;
            let y = this._diameter * 0.5 + this.Config.FontSize / 2 + 5;
            this._ctx.fillText(timeText, x, y, this._diameter);
        }
        /**
         * 绘制内圈
         * @param data 数据
         * @param maxData 数据最大值
         */
        private DrawInner(data: number, maxData: number)
        {
            let startAngle = this._diameter * 0.24;
            this.DrawRing(data, maxData, startAngle);
        }
        /**
         * 绘制中圈
         * @param data 数据
         * @param maxData 数据最大值
         */
        private DrawMiddle(data: number, maxData: number)
        {
            let startAngle = this._diameter * 0.32;
            this.DrawRing(data, maxData, startAngle);
        }
        /**
         * 绘制外圈
         * @param data 数据
         * @param maxData 数据最大值
         */
        private DrawOuter(data: number, maxData: number)
        {
            let startAngle = this._diameter * 0.4;
            this.DrawRing(data, maxData, startAngle);
        }
        /**
         * 绘制圈
         * @param data 数据
         * @param maxData 数据最大值
         * @param startAngle 开始绘制距离
         */
        private DrawRing(data: number, maxData: number, startAngle: number)
        {
            this._ctx.beginPath();
            let anticlockwise = this.DegToRad((data * 360 / maxData) - 90);
            this._ctx.arc(this._centerPointXY, this._centerPointXY, startAngle, this._endAngle, anticlockwise);
            this._ctx.stroke();
        }
        /**
         * 角度转换弧度
         * @param degree 角度
         */
        private DegToRad(degree: number): number
        {
            let factor = Math.PI / 180;
            return degree * factor;
        }
    }
    /**
     * 离子钟配置模型
     */
    export class IonClockConfigModel
    {
        /**
         * 显示颜色
         */
        public Color: string;
        /**
         * 背景颜色
         */
        public BackgroundColor: string;
        /**
         * 线宽
         */
        public LineWidth: number;
        /**
         * 字体大小
         */
        public FontSize: number;
        /**
         * 字体
         */
        public FontFamily: string;
        /**
         * 阴影
         */
        public ShadowBlur: number;
        /**
         * 正序
         */
        public IsAsc: boolean;
    }
    /**
     * 离子时钟时间模型
     */
    class IonClockDateTimeModel
    {
        /**
         * 构造方法
         */
        constructor(date: Date = new Date())
        {
            this._date = date;
        }
        /**
         * 日期对象
         */
        private _date: Date;
        /**
         * 日期字符串
         */
        public get DateStr(): string
        {
            return this._date.MDateTimeFormat("yyyy/MM/dd");
        }
        /**
         * 时间字符串
         */
        public get TimeStr(): string
        {
            return this._date.MDateTimeFormat("HH:mm:ss");
        }
        /**
         * 时
         */
        public get Hours(): number
        {
            return this._date.getHours() + (this.Minutes / 60);
        }
        /**
         * 分
         */
        public get Minutes(): number
        {
            return this._date.getMinutes() + (this.Seconds / 60);
        }
        /**
         * 秒
         */
        public get Seconds(): number
        {
            return this._date.getSeconds() + (this.Milliseconds / 1000);
        }
        /**
         * 毫秒
         */
        private get Milliseconds(): number
        {
            return this._date.getMilliseconds();
        }
    }
}