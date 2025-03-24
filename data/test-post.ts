export const testPosts = [
  //text
  {
    id: "1",
    username: "thoughts-daily",
    profilePic: "https://i.pravatar.cc/150?img=11",
    postTime: new Date(Date.now() - 3600000 * 3), // 3 hours ago
    postType: "text",
    title: "Why I Love Next.js",
    textContent: "After using it for several projects, I've found Next.js to be the most productive framework I've worked with. The file-based routing, API routes, and now the App Router have completely changed how I build web apps.",
    notes: 28,
    isFollowing: false
  },

  //photo
  {
    id: "2",
    username: "urban-photography",
    profilePic: "https://i.pravatar.cc/150?img=22",
    postTime: new Date(Date.now() - 86400000), // 1 day ago
    postType: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    caption: "Downtown skyline at golden hour",
    textContent: "Caught this amazing light yesterday evening!",
    notes: 142,
    isFollowing: false
  },

  //video
  {
    id: "3",
    username: "ghibli-dork",
    profilePic: "https://i.pravatar.cc/150?img=33",
    postTime: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    postType: "video",
    mediaUrl: "https://rr5---sn-8xgp1vo-p5qe7.googlevideo.com/videoplayback?expire=1742867304&ei=CLfhZ_TfEb--kucPqraRuQo&ip=45.203.28.190&id=o-AD4sXqUT2G7BIzyRvlZbVwDdJkDZFcKQK4Rhpp1wHQDG&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AccgBcMWuagZtPN1BKVS1ISMETbiAIWeKKw7xb-N0UjkTqZNKr56TN_qeu6P-4Ee3tCmlMlG5zLUPDVY&spc=_S3wKk2XnsHFi11qleUHqLbQGML67bpnFIOlYirN_JyRWgJTZcG5Ysa93J8DQ-qU89azng&vprv=1&svpuc=1&mime=video%2Fmp4&ns=yX18Ux1tDcV_0zMnDYhc-pwQ&rqh=1&gir=yes&clen=512079118&ratebypass=yes&dur=8204.027&lmt=1741329253268575&fexp=24350590,24350737,24350778,24350827,24350961,24351146,24351173,24351229,24351283,24351353,24351394,24351396,24351398,24351430,24351468,51355912&c=WEB&sefc=1&txp=4538534&n=gh6uujJQWOH1sw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgbgojShc9_eM1YMRvtXoJT10b_q86hNRc71Ye8W0-NzICIQDNHcBx2LrC5mXnVBPuQXnYyFjcfrHmQN7Dr6dd8If7pw%3D%3D&pot=MnRxOpZqOOd3vXEC0WP5uC72UFiNQuERQBheINsIm19QdMH1YxzSOlKw05JFLm5TDxWdUmc7xE9gQ1TFH1OQfs1sM7YLr3dkVTjk_JCrO2Ql513G6_l630Ht_NmkejbijWPIQG59q7aaSSHbKoSgR5tspEgCxQ%3D%3D&range=0-&title=[Ghibli%20Piano%20Collection]%20🥝%20~%20Best%20Ghibli%20Collection%20🌿%20Love%20Life%20More%20With%20Ghibli%20Melodies&rm=sn-gjo-qj5l7e,sn-p5qees76&rrc=79,104&req_id=3a720db1be50a6e9&rms=rdu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1742845724,&mh=Yq&mip=2600:4040:b8d3:2600:d89a:1a4f:c4e9:74c2&mm=29&mn=sn-8xgp1vo-p5qe7&ms=rdu&mt=1742845289&mv=m&mvi=5&pl=36&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AFVRHeAwRAIgVT-Rs2t2tERoRmROilpQpUIN_qCKHsgiCKZqYqJWz0YCIDaKYNgNOzHHjCawk9o4eKzna7QBWQAHPuE_doKV5DCJ",
    caption: "i love studio ghibli",
    notes: 87,
    isFollowing: false
  },


  //link
  {
    id: "5",
    username: "news-guy",
    profilePic: "https://i.pravatar.cc/150?img=55",
    postTime: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    postType: "link",
    mediaUrl: "https://www.dropsitenews.com/p/mahmoud-khalil-journey-refugee-syria-columbia-university",
    title: '“First, They Came for Mahmoud Khalil”',
    textContent: "Interesting read...",
    notes: 56,
    isFollowing: false
  }
];