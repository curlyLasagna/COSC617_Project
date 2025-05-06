import type { Post } from "@/components/post-card";
import { mockUsers } from "./mock-users";

// mockPosts created using mockUsers
export const testPosts: Post[] = [
  //text
  {
    id: 1,
    users: {
      username: mockUsers[0].username,
      profile_picture_url: mockUsers[0].profile_picture_url,
    },
    postTime: new Date(Date.now() - 3600000 * 3), // 3 hours ago
    postType: "text",
    title: "Own a musket for home defense",
    textContent:
      'Own a musket for home defense, since that\'s what the founding fathers intended. Four ruffians break into my house. "What the devil?" As I grab my powdered wig and Kentucky rifle. Blow a golf ball sized hole through the first man, he\'s dead on the spot. Draw my pistol on the second man, miss him entirely because it\'s smoothbore and nails the neighbors dog. I have to resort to the cannon mounted at the top of the stairs loaded with grape shot, "Tally ho lads" the grape shot shreds two men in the blast, the sound and extra shrapnel set off car alarms. Fix bayonet and charge the last terrified rapscallion. He Bleeds out waiting on the police to arrive since triangular bayonet wounds are impossible to stitch up. Just as the founding fathers intended.',
    notes: 28,
    isFollowing: false,
  },

  //photo
  {
    id: 2,
    users: {
      username: mockUsers[1].username,
      profile_picture_url: mockUsers[1].profile_picture_url,
    },
    postTime: new Date(Date.now() - 86400000), // 1 day ago
    postType: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    caption: "In the mountains",
    notes: 142,
    isFollowing: false,
  },

  //video
  // video works, just the link i used doesnt store videos long term
  {
    id: 3,
    users: {
      username: mockUsers[2].username,
      profile_picture_url: mockUsers[2].profile_picture_url,
    },
    postTime: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    postType: "video",
    mediaUrl:
      "https://rr2---sn-8xgp1vo-p5qy.googlevideo.com/videoplayback?expire=1742891046&ei=xhPiZ9XGHJGAkucPo7yrsQ8&ip=72.25.254.35&id=o-AFbQuIfJerxq-PA3IjLEzMLc_P80z3LBnYwf-2qswrLF&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AccgBcOez9cwehojBQhSGcl7r52TaJFt8prFw3Sjx6E6jFgF2CLhTiLAHIx5sKtN-dDuEUtVv-NggDuN&spc=_S3wKrf1W1Alo1j19P4sQQn__YZIS-WM6WBTOaEk3zJIkuOQWkMzSo0MWLlvhxSEeop5Qw&vprv=1&svpuc=1&mime=video%2Fmp4&ns=rHLwoWDdTH79v9zB4RxRzy4Q&rqh=1&gir=yes&clen=1932705883&ratebypass=yes&dur=42895.336&lmt=1740089708827365&fexp=24350590,24350737,24350778,24350827,24350961,24351146,24351173,24351283,24351353,24351395,24351397,24351398,24351468,51355912,51435732&c=WEB&sefc=1&txp=5438534&n=XylrnGIsug7Nig&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAMv2Z9JV__95KA7KwTsf3vWtDWhaWXoWG0NpQ_lMWpSWAiEAmklltuXeMPnIUcrUf0sLrBIXXXZdbErkfogAH-XPvdA%3D&pot=MnSTeG1V5XZA4pNAkubuMrxv_-PnEKCTHUZkSWouTQ-rhCEItrXI_ZrIp0_CM4pW5vAzUeWAnD4ubIIcskmwcijMk_yiNW4XMUgJm-l1v-V9anRlzsqt-xrbvTsHvziI9f83XgtPmTGcHh-4MQIGOU3AcQUrCQ%3D%3D&range=0-&title=Ghibli%20Chill%F0%9F%8C%8A%20Studying,%20coffee,%20reading,%20healing%20%F0%9F%8E%A7%20Ghibli%20Music&rm=sn-gjo-qj5l7e,sn-p5qeez7l&rrc=79,104&req_id=2178e0f06c76a6e9&rms=rdu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1742869448,&mh=Af&mip=2600:4040:b8d3:2600:d8af:a640:b235:6daf&mm=29&mn=sn-8xgp1vo-p5qy&ms=rdu&mt=1742869024&mv=m&mvi=2&pl=36&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AFVRHeAwRQIgMsdZcXXReoAfkaJKdslbelZdrmNEXAGKFU0twocoWv8CIQD0Ml9IexnmOI55KFuqJGvjrsfoVY5Da7Y3AOXARuI1pA%3D%3D",
    caption: "i love studio ghibli",
    notes: 87,
    isFollowing: false,
  },

  //link
  {
    id: 5,
    users: {
      username: mockUsers[3].username,
      profile_picture_url: mockUsers[3].profile_picture_url,
    },
    postTime: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    postType: "link",
    mediaUrl:
      "https://www.dropsitenews.com/p/mahmoud-khalil-journey-refugee-syria-columbia-university",
    title: "“First, They Came for Mahmoud Khalil”",
    textContent: "Interesting read...",
    notes: 56,
    isFollowing: false,
  },
];
