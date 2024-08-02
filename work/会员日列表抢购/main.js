"ui";

ui.layout(
    <vertical padding="16" id="parent">
        <TextView text="会员日列表抢购" gravity="center" textSize="24sp" padding="10 10 10 10" />
        <horizontal>
            <TextView w="auto" text="点击【执行脚本】后自行进入会员日列表，停留等待" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="请输入抢购商品名称" />
        </horizontal>
        <horizontal>
            <input id="goodname" text="" hint="请输入抢购商品名称" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="请输入抢购时间（格式：HH:mm）" />
        </horizontal>
        <horizontal>
            <input id="time" text="17:00" hint="请输入抢购时间（格式：HH:mm）" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="选购规格（例如：张）" />
        </horizontal>
        <horizontal>
            <input id="specification" text="张" hint="请输入抢购规格" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="首个输入框预填内容（例如：身份证）" />
        </horizontal>
        <horizontal>
            <input id="advance" text="" hint="预填内容" />
        </horizontal>
        <button marginTop="30s" id="openUtils" text="执行脚本" />
    </vertical>
);

const common = require("../../common/common");

function doBuyUtil(specification) {
    if (common.xs_控件匹配是否存在("text", "立即兑换")) {
        click("立即兑换");
    } else {
        setTimeout(()=> doBuyUtil(specification), 100)   
        return     
    }
    if (common.xs_控件匹配是否存在("text", specification || "张")) {
        click(specification || "张");
    }else{
        setTimeout(()=> doBuyUtil(specification), 100)   
        return
    }
    if (common.xs_控件匹配是否存在("text", "立即兑换")) {
        click("立即兑换");
    }else{
        setTimeout(()=> doBuyUtil(specification), 100)   
        return
    }

    function duihuan() {
        if (common.xs_控件匹配是否存在("text", "确认兑换")) {
            if(ui.advance.text()) setText(0, ui.advance.text())
            click("确认兑换");
        } else {
            setTimeout(duihuan, 50);
        }
    }

    duihuan();
}

ui.openUtils.click(function () {
    let close = false;
    const inputTime = ui.time.text();
    const specification = ui.specification.text();
    const [hours, minutes] = inputTime.split(':').map(Number);
    
    
    if (!ui.goodname.text()) {
        toast("请输入待抢商品名称");
        return;
    }

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) {
        toast("请输入有效的时间格式（HH:mm）");
        return;
    }

    if (!specification) {
        toast("请输入待抢规格");
        return;
    }

    toast("脚本程序已启动!!");

    const updateCountdown = (specification) => {
        const now = new Date();
        const targetTime = new Date();
        targetTime.setHours(hours, minutes, 0, 0);

        // 如果当前时间已经超过目标时间，则设置为明天的目标时间
        if (now > targetTime) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const remainingTime = targetTime - now;

        // 计算小时、分钟和秒
        const hr = Math.floor(remainingTime / (1000 * 60 * 60));
        const min = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const sec = Math.floor((remainingTime % (1000 * 60)) / 1000);

        // 显示剩余时间
        toast(`距离 ${inputTime} 还有 ${hr} 小时 ${min} 分 ${sec} 秒`);

        // 如果还有时间，继续更新
        if (!close && remainingTime > 1000) {
            setTimeout(updateCountdown, 1000);
        } else {
            close = true;
            // 到达目标时间后，停止更新
            toast("时间到，开始进入页面");

            if (common.xs_控件匹配是否存在("text", ui.goodname.text())) {
                click(ui.goodname.text());
                
                setTimeout(() => doBuyUtil(specification), 300);
            }else{
                toast(`未找到${ui.goodname.text()}, 脚本执行中断`);
            }
        }
    };

    // 开始倒计时
    setTimeout(() => {
        updateCountdown(specification);
    }, 1500);
});
