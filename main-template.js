// 自动做题
(async function () {
  solve(JSON.parse('{{questions}}'))

  function solve (questions) {
    let count = 0
    //console.log($('.shiti'))
    //console.log(questions)
    $('.shiti').each((_, el) => {
      //console.log($(el).find('h3').text())
      const title = $(el).find('h3').text().replace(/[0-9]*、/,'').replace(/\'/g,'&#039;').replace(/\"/g,"&quot;").replace(/\\/g,'反斜杠').replace(/\n/g,'<br>')
      const radios = $(el).find('input')
      //console.log(radios)
      //console.log(questions[0][title],questions[0].hasOwnProperty(title))
      const question = questions[0] == undefined?false:questions[0][title]
      if (!question) return console.log(`题库缺少：${title}`)
      //console.log(question)
      if(question == '正确' || question == '错误'){
        if(question == '正确'){
          i=0
        }
        else{
          i=1
        }
      }else{
        i = question.charCodeAt(0) - 'A'.charCodeAt(0)
      }
      radios[i].click()

      count++
    })
    console.log(`已经作答 ${count} 题！请点击提交。`)
  }
})()
