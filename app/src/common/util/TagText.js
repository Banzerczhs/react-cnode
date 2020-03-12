const tab = {
    top:{
        color: "top",
        txt: "置顶"
    },
    good:{
        color: "good",
        txt: "精华"
    },
    job:{
        color: "cyan",
        txt: "招聘"
    },
    share:{
        color: "purple",
        txt: "分享"
    },
    ask:{
        color: "green",
        txt: "问答"
    },
    dev:{
        color: "lime",
        txt: "测试"
    }
};

function getText(top,good,key){
    return top?tab['top']:
                good?tab['good']:tab[key];
}

export default getText;