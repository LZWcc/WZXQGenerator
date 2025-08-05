const drinks = [
    "可乐", "O泡", "奶茶", "旺仔", "雪碧", "冰红茶", "美年达",
    "芬达", "脉动", "红牛", "椰树", "柠檬茶", "美汁源", "雀巢",
    "绿茶", "三得利", "养乐多", "AD钙奶", "七喜", "果粒橙",
    "王老吉", "加多宝", "维他奶", "蒙牛", "伊利", "康师傅",
    "农夫山泉", "百事", "雪花", "东鹏", "光明", "尖叫", "茶π"
];

const heroes = [
    "小乔", "司空震", "西施", "露娜", "吕布", "李白", "关羽", "孙尚香",
    "貂蝉", "韩信", "赵云", "诸葛亮", "安琪拉", "妲己", "后羿",
    "鲁班七号", "铠", "典韦", "亚瑟", "王昭君", "甄姬", "虞姬",
    "项羽", "刘邦", "张飞", "黄忠", "马可波罗", "兰陵王", "阿轲",
    "百里守约", "百里玄策", "孙悟空", "猪八戒", "杨戬", "哪吒",
    "女娲", "盘古", "钟馗", "东皇太一", "太乙真人", "干将莫邪",
    "嬴政", "高渐离", "芈月", "白起", "廉颇", "程咬金", "达摩",
    "雅典娜", "娜可露露", "橘右京", "不知火舞", "宫本武藏", "花木兰",
    "李元芳", "狄仁杰", "成吉思汗", "伽罗", "蒙犽", "沈梦溪",
    "米莱狄", "弈星", "明世隐", "鬼谷子", "大乔", "瑶", "云中君",
    "镜", "澜", "艾琳", "暃", "桑启", "戈娅", "海月", "赵怀真",
    "姬小满", "亚连", "莱西奥", "上官婉儿", "司马懿", "元歌",
    "裴擒虎", "公孙离", "梦奇", "狂铁", "盾山", "苏烈", "钟无艳",
    "夏侯惇", "刘禅", "庄周", "墨子", "老夫子", "扁鹊", "孙膑",
    "蔡文姬", "张良", "姜子牙", "周瑜", "黄月英", "鲁班大师",
    "蒙恬", "夏洛特", "元歌", "沈梦溪", "云缨", "司马懿",
    "杨玉环", "张飞", "孙策", "孙膑", "刘邦", "张良",
    "姜子牙", "周瑜", "黄忠", "马超"
];

function parseLength(value) {
    return value === 'Infinity' ? Infinity : parseInt(value);
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1000);
}

function render() {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    const historyList = document.querySelector(".history-list");
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">暂无历史记录</div>';
        return;
    }

    for (let i = history.length - 1; i >= 0; i--) {
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        historyItem.innerHTML = `
            <span class="history-name">${history[i]}</span>
            <span class="history-time">${new Date().toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })}</span>
        `;

        // 添加点击复制功能
        historyItem.addEventListener('click', () => {
            navigator.clipboard.writeText(history[i])
                .then(() => {
                    showToast("复制成功");
                })
                .catch(() => {
                    showToast("复制失败");
                });
        });

        historyList.appendChild(historyItem);
    }
}

const result = document.querySelector(".result");
const btn = document.querySelector("button");
let history = JSON.parse(localStorage.getItem("history")) || [];
btn.addEventListener("click", () => {
    const drinkMaxLength = parseLength(document.querySelector('#drink-length').value);
    const heroMaxLength = parseLength(document.querySelector('#hero-length').value);

    const filteredDrinks = drinks.filter(item => item.length <= drinkMaxLength);
    const filteredHeroes = heroes.filter(item => item.length <= heroMaxLength);

    const randomDrink = getRandomElement(filteredDrinks);
    const randomHero = getRandomElement(filteredHeroes);
    const newName = `${randomDrink}${randomHero}`;
    if (!randomDrink || !randomHero) {
        alert("没有符合条件的饮料或英雄，请调整长度限制。");
        return;
    }
    result.innerHTML = `${newName}`;
    history.push(newName);
    localStorage.setItem("history", JSON.stringify(history));
    render();
})

result.addEventListener("click", () => {
    const text = result.textContent;
    if (!text) return;

    navigator.clipboard.writeText(text)
        .then(() => {
            showToast("复制成功");
        })
        .catch(() => {
            showToast("复制失败");
        });
});

const clearBtn = document.querySelector(".clear-history-btn");
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("history");
    history = [];
    render();
});
render();
