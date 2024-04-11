"ui";

ui.layout(
    <vertical padding="16" id="parent">
        <TextView text="锦江荟抢购" gravity="center" textSize="24sp" padding="10 10 10 10" />
        <horizontal>
            <TextView w="auto" text="使用说明：" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="1. 虚拟机使用本插件需打开无障碍服务" />
        </horizontal>

        <horizontal>
            <TextView w="auto" text="2. 请先保证已登录账户" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="3. 手动进入想要抢购的商品界面" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="4. 如果待抢商品有规格参数请预先选择好规格" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="5. 点击开始抢购" />
        </horizontal>
        <button marginTop="30s" id="openUtils" text="点击进入抢购模式" />
    </vertical>
);

const { waitTime } = require("../../common/common");
const common = require("../../common/common");
const appName = "锦江荟"

ui.openUtils.click(function(){
    threads.start(function () {
        launchApp(appName);
        floatyWindow();
    });
});


function floatyWindow() {
    var window = floaty.window(
        <vertical>
            <horizontal>
                <button width="60" id="start" text="抢购"></button>
                <button width="60" id="pause" text="暂停"></button>
            </horizontal>
        </vertical>
    );

    window.setPosition(device.width * 0.7, device.height * 0.5);
    let timer = null
    window.start.click(() => {
        timer = setInterval(()=>{
            toast("抢购中...")
            click("立即兑换")
        }, 50)
    });

    window.pause.click(() => {
        clearInterval(timer)
        timer = null
        toast("已经暂停抢购")
    });
}