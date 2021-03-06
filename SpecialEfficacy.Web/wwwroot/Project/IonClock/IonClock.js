var MateralSpecialEfficacy;
(function (MateralSpecialEfficacy) {
    var IonClock = /** @class */ (function () {
        /**
         * 构造方法
         * @param canvasID 画布ID
         * @param color 颜色
         * @param backgroundColor 背景颜色
         */
        function IonClock(canvasID, config) {
            /**
             * 绘制标识
             */
            this._isDraw = false;
            IonClock._this = this;
            this.Config = config;
            this._canvas = document.getElementById(canvasID);
            if (this._canvas) {
                this._diameter = this._canvas.width > this._canvas.height ? this._canvas.height : this._canvas.width;
                this._centerPointXY = this._diameter / 2;
                this._endAngle = this.DegToRad(270);
                this._ctx = this._canvas.getContext("2d");
            }
            else {
                throw "未能找到对应画布，请检查是否拥有ID为" + canvasID + "的<canvas>元素";
            }
        }
        Object.defineProperty(IonClock.prototype, "IsDraw", {
            /**
             * 绘制标识
             */
            get: function () {
                return this._isDraw;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 绘制
         */
        IonClock.prototype.Draw = function () {
            var dateM = new IonClockDateTimeModel();
            IonClock._this.DrawBackground();
            IonClock._this.InitCtx();
            IonClock._this.DrawDateText(dateM.DateStr);
            IonClock._this.DrawTimeText(dateM.TimeStr);
            if (IonClock._this.Config.IsAsc) {
                IonClock._this.DrawInner(dateM.Seconds, 60);
                IonClock._this.DrawOuter(dateM.Hours, 12);
            }
            else {
                IonClock._this.DrawInner(dateM.Hours, 12);
                IonClock._this.DrawOuter(dateM.Seconds, 60);
            }
            IonClock._this.DrawMiddle(dateM.Minutes, 60);
            if (IonClock._this._isDraw) {
                requestAnimationFrame(IonClock._this.Draw);
            }
        };
        /**
         * 初始化画笔
         */
        IonClock.prototype.InitCtx = function () {
            this._ctx.lineWidth = this.Config.LineWidth;
            this._ctx.font = this.Config.FontSize + "px " + this.Config.FontFamily;
            this._ctx.strokeStyle = this.Config.Color;
            this._ctx.shadowColor = this.Config.Color;
            this._ctx.fillStyle = this.Config.Color;
            this._ctx.shadowBlur = this.Config.ShadowBlur;
        };
        /**
         * 开始绘制
         */
        IonClock.prototype.StartDraw = function () {
            this._isDraw = true;
            this.Draw();
        };
        /**
         * 停止绘制
         */
        IonClock.prototype.StopDraw = function () {
            this._isDraw = false;
        };
        /**
         * 绘制背景
         */
        IonClock.prototype.DrawBackground = function () {
            this._ctx.fillStyle = this.Config.BackgroundColor;
            this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        };
        /**
         * 绘制日期文本
         * @param dateText 日期文本
         */
        IonClock.prototype.DrawDateText = function (dateText) {
            var textwidth = this._ctx.measureText(dateText).width;
            var x = this._diameter * 0.5 - textwidth / 2;
            var y = this._diameter * 0.5 - this.Config.FontSize / 2;
            this._ctx.fillText(dateText, x, y, this._diameter);
        };
        /**
         * 绘制时间文本
         * @param timeText 时间文本
         */
        IonClock.prototype.DrawTimeText = function (timeText) {
            var textwidth = this._ctx.measureText(timeText).width;
            var x = this._diameter * 0.5 - textwidth / 2;
            var y = this._diameter * 0.5 + this.Config.FontSize / 2 + 5;
            this._ctx.fillText(timeText, x, y, this._diameter);
        };
        /**
         * 绘制内圈
         * @param data 数据
         * @param maxData 数据最大值
         */
        IonClock.prototype.DrawInner = function (data, maxData) {
            var startAngle = this._diameter * 0.24;
            this.DrawRing(data, maxData, startAngle);
        };
        /**
         * 绘制中圈
         * @param data 数据
         * @param maxData 数据最大值
         */
        IonClock.prototype.DrawMiddle = function (data, maxData) {
            var startAngle = this._diameter * 0.32;
            this.DrawRing(data, maxData, startAngle);
        };
        /**
         * 绘制外圈
         * @param data 数据
         * @param maxData 数据最大值
         */
        IonClock.prototype.DrawOuter = function (data, maxData) {
            var startAngle = this._diameter * 0.4;
            this.DrawRing(data, maxData, startAngle);
        };
        /**
         * 绘制圈
         * @param data 数据
         * @param maxData 数据最大值
         * @param startAngle 开始绘制距离
         */
        IonClock.prototype.DrawRing = function (data, maxData, startAngle) {
            this._ctx.beginPath();
            var anticlockwise = this.DegToRad((data * 360 / maxData) - 90);
            this._ctx.arc(this._centerPointXY, this._centerPointXY, startAngle, this._endAngle, anticlockwise);
            this._ctx.stroke();
        };
        /**
         * 角度转换弧度
         * @param degree 角度
         */
        IonClock.prototype.DegToRad = function (degree) {
            var factor = Math.PI / 180;
            return degree * factor;
        };
        return IonClock;
    }());
    MateralSpecialEfficacy.IonClock = IonClock;
    /**
     * 离子钟配置模型
     */
    var IonClockConfigModel = /** @class */ (function () {
        function IonClockConfigModel() {
        }
        return IonClockConfigModel;
    }());
    MateralSpecialEfficacy.IonClockConfigModel = IonClockConfigModel;
    /**
     * 离子时钟时间模型
     */
    var IonClockDateTimeModel = /** @class */ (function () {
        /**
         * 构造方法
         */
        function IonClockDateTimeModel(date) {
            if (date === void 0) { date = new Date(); }
            this._date = date;
        }
        Object.defineProperty(IonClockDateTimeModel.prototype, "DateStr", {
            /**
             * 日期字符串
             */
            get: function () {
                return this._date.MDateTimeFormat("yyyy/MM/dd");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonClockDateTimeModel.prototype, "TimeStr", {
            /**
             * 时间字符串
             */
            get: function () {
                return this._date.MDateTimeFormat("HH:mm:ss");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonClockDateTimeModel.prototype, "Hours", {
            /**
             * 时
             */
            get: function () {
                return this._date.getHours() + (this.Minutes / 60);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonClockDateTimeModel.prototype, "Minutes", {
            /**
             * 分
             */
            get: function () {
                return this._date.getMinutes() + (this.Seconds / 60);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonClockDateTimeModel.prototype, "Seconds", {
            /**
             * 秒
             */
            get: function () {
                return this._date.getSeconds() + (this.Milliseconds / 1000);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IonClockDateTimeModel.prototype, "Milliseconds", {
            /**
             * 毫秒
             */
            get: function () {
                return this._date.getMilliseconds();
            },
            enumerable: true,
            configurable: true
        });
        return IonClockDateTimeModel;
    }());
})(MateralSpecialEfficacy || (MateralSpecialEfficacy = {}));
//# sourceMappingURL=IonClock.js.map