"ui";

ui.layout(
    <vertical padding="16" id="parent">
        <TextView text="兑换抢购" gravity="center" textSize="24sp" padding="10 10 10 10" />
        <horizontal>
            <TextView w="auto" text="点击【执行脚本】后自行进入商品页面，停留等待" />
        </horizontal>
        <button marginTop="30s" id="openUtils" text="执行脚本" />
    </vertical>
);

const common = require("../../common/common");

function doBuyUtil() {
    if(common.xs_控件匹配是否存在("text", "立即兑换")){
        click("立即兑换");
        common.waitTime(0.01)
    }else{
        toast("未找到立即兑换按钮, 脚本执行中断")
    }
    if(common.xs_控件匹配是否存在("text", "张")){
        click("张");
        common.waitTime(0.01)
    }
    if(common.xs_控件匹配是否存在("text", "立即兑换")){
        click("立即兑换");
        common.waitTime(1)
    }
    
    function duihuan() {
        if(common.xs_控件匹配是否存在("text", "确认兑换")){
            click("确认兑换");
        }else{
            setTimeout(duihuan, 50)
        }
    }

    duihuan()
}

ui.openUtils.click(function(){
    let close = false
    
    toast("脚本程序已启动!!");
    
    const updateCountdown = () => {
        const now = new Date();
        const targetTime = new Date();
        targetTime.setHours(11, 2, 0, 0);
    
        // 如果当前时间已经超过14:00，则设置为明天的14:00
        if (now > targetTime) {
            targetTime.setDate(targetTime.getDate() + 1);
        }
    
        const remainingTime = targetTime - now;
    
        // 计算小时、分钟和秒
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
        // 显示剩余时间
        toast(`距离下午2点还有 ${hours} 小时 ${minutes} 分 ${seconds} 秒`);
    
        // 如果还有时间，继续更新
        if (!close && remainingTime > 1000) {
            setTimeout(updateCountdown, 1000);
        } else {
            close = true
            // 到达目标时间后，停止更新
            toast("时间到，开始点击“立即兑换”");

            setTimeout(()=>doBuyUtil(), 50)
        }
    };

    // 开始倒计时
    setTimeout(()=>{
        updateCountdown();
    }, 1500)
});
