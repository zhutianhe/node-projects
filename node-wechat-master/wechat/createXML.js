'use strict'

function createXML(messageObj) {
  console.log('进入创建回复内容')
  var {ToUserName, FromUserName, MsgType = 'text'} = messageObj;
  var CreateTime = new Date().getTime();
  var header = `<xml>
                  <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
                  <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
                  <CreateTime>${CreateTime}</CreateTime>
                  <MsgType><![CDATA[${MsgType}]]></MsgType>`;
  var content = '';
  switch(MsgType) {
    case 'text':
      var { Content } = messageObj;
      content = `<Content><![CDATA[${Content}]]></Content>
               </xml>`;
      break;
    case 'image':
      var { MediaId }  = messageObj;
      content = `<Image>
                   <MediaId><![CDATA[${MediaId}]]></MediaId>
                 </Image>
               </xml>`;
      break;
    case 'voice':
      var { MediaId } = messageObj;
      content = `<Voice>
                   <MediaId><![CDATA[${MediaId}]]></MediaId>
                 </Voice>
               </xml>`;
      break;
    case 'video':
      var { MediaId, Title, Description } = messageObj;
      content = `<Video>
                   <MediaId><![CDATA[${MediaId}]]></MediaId>
                   <Title><![CDATA[${Title}]]></Title>
                   <Description><![CDATA[${Description}]]></Description>
                 </Video> 
               </xml>`;
      break;
    case 'music':
      var { Title, Description, MusicUrl, HQMusicUrl, ThumbMediaId } = messageObj;
      content = `<Music>
                   <Title><![CDATA[${Title}]]></Title>
                   <Description><![CDATA[${Description}]]></Description>
                   <MusicUrl><![CDATA[${MusicUrl}]]></MusicUrl>
                   <HQMusicUrl><![CDATA[${HQMusicUrl}]]></HQMusicUrl>
                   <ThumbMediaId><![CDATA[${ThumbMediaId}]]></ThumbMediaId>
                 </Music>
               </xml>`;
      break;
    case 'news':
      var { Articles } = messageObj;
      var ArticleCount = Articles.length;
      content = `<ArticleCount>${ArticleCount}</ArticleCount><Articles>`;
      for (var i = 0; i < ArticleCount; i++) {
          content += `<item>
                          <Title><![CDATA[${Articles[i].Title}]]></Title>
                          <Description><![CDATA[${Articles[i].Description}]]></Description>
                          <PicUrl><![CDATA[${Articles[i].PicUrl}]]></PicUrl>
                          <Url><![CDATA[${Articles[i].Url}]]></Url>
                        </item>`;
      }
      content += '</Articles></xml>';
      break;
    default:
      content = `<Content><![CDATA[Error]]></Content>
               </xml>`;
  }
  
  var xml = header + content;
  return xml;
}

module.exports = createXML;