require(["news_F_comment#1.5.2", "jquery#1.8.1", "detail"],
  function(cmt, jq, detail) {
    console.log(cmt, jq, detail);
    let shite_inject = {
      cmt:cmt,
      jq:jq,
      detail:detail,
      doPush: function (msg) {
        cmt.prototype.create();
        var p = {
          docUrl: detail.docUrl,
          docName: detail.docName,
          speUrl: detail.speUrl,
          skey: detail.skey,
          format: "js",
          content: msg,
          callback: "postCmt",
          permalink: detail.docUrl
        };
        jq.ajax({
          url: cmt.prototype.cmtPostUrl,
          data: p,
          dataType: "jsonp",
          jsonpCallback: "callback",
          jsonpCallback: "postCmt",
          cache: !0,
          success: function (data, status, xhr) {
            console.log(data, status, xhr);
          }
        })
      },
      sleep :function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      cmtGen: async function (b64) {
        let doc = decodeURIComponent(escape(window.atob(b64)));
        let comments =  doc.split(/[。！？；：～ .:;?!~`"&|\[\]\r\n\s/\\]+/);
        let newcomments = comments.filter(item => item);
        
        if (!newcomments.length) {
          console.log("无话可说")
          return
        }
        console.log(newcomments);
        // reconcile task.  post commit
        for (let idx = 0; newcomments.length > 0 &&idx < newcomments.length; idx++) {
          let cmt = newcomments[idx];
          if (cmt == null) {}
          console.log("comment  ", idx + 1, ":", cmt);
          this.doPush(cmt);
          await this.sleep(10000);
        }
      }};
    window.shite_inject = shite_inject;
  return shite_inject;
  });
