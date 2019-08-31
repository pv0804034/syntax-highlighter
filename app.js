let codeelement = document.querySelector('#code');
let btn = document.querySelector('#btn');
let postcode = document.querySelector('#postcode');

btn.addEventListener('click', (e) => {
    var code = postcode.value;
    formatcode(code);
});

var cpp = ["asm",	"bool",	"catch",	"class",	"const_cast",
    "delete",	"dynamic_cast",	"explicit",	"false",	"friend",
    "inline",	"mutable", 	"namespace", "new",	"operator",
    "private",	"protected",	"public",	"reinterpret_cast",	"static_cast",
    "template",	"this",	"throw",	"true",	"try",
    "typeid",	"typename",	"virtual",	"using",	"wchar_t","auto",	"break",	"case",	"char",	"const",	"continue",
    "default",	"do",	"double",	"else",	"enum",	"extern",
    "float",	"for",	"goto",	"if",	"int",	"long",
    "register",	"return",	"short",	"signed",	"sizeof",	"static",
    "struct",	"switch",	"typedef",	"union",	"unsigned",	"void",
    "volatile",	"while"];

var c11 = [
    "auto",	"break",	"case",	"char",	"const",	"continue",
    "default",	"do",	"double",	"else",	"enum",	"extern",
    "float",	"for",	"goto",	"if",	"int",	"long",
    "register",	"return",	"short",	"signed",	"sizeof",	"static",
    "struct",	"switch",	"typedef",	"union",	"unsigned",	"void",
    "volatile",	"while"];

var java = ['abstract',	'assert',	'boolean',	'break',
  'byte',	'case',	'catch',	'char',
  'class',	'const',	'continue',	'default',
  'do',	'double',	'else',	'enum',
  'extends',	'final',	'finally',	'float',
  'for',	'goto',	'if',	'implements',
  'import',	'instanceof',	'int',	'interface',
  'long',	'native',	'new',	'package',
  'private',	'protected',	'public',	'return',
  'short',	'static',	'strictfp',	'super',
  'switch',	'synchronized',	'this',	'throw',
  'throws',	'transient',	'try',	'void',
  'volatile',	'while',	 'true',	 'false',
  'null'];

var py = ['False',	'class',	'finally',	'is',	'return',
  'None',	'continue',	'for',	'lambda',	'try',
  'True',	'def',	'from',	'nonlocal',	'while',
  'and',	'del',	'global',	'not',	'with',
  'as',	'elif',	'if',	'or',	'yield',
  'assert',	'else',	'import',	'pass',	 
  'break',	'except',	'in',	'raise'];

function formatcode(maincode) {
  var final_code = '';
  let lang = document.getElementById('lang').value;
  var code = maincode;
  code = code.replace(/</g,"&lt;");
  code = code.replace(/>/g,"&gt;");
  // code = code.replace(/&/g,"&amp;");

  if(lang == "python"){
    let res = "";
    let n = code.length;
    let s_comment = false;
    let m_s_comment = false;
    let m_d_comment = false;
    let single_quote = false;
    let double_quote = false;
    for(let i = 0;i<n;i++){
      if(s_comment == true && code[i] == '\n'){
       // console.log( i + "hello");
        res = res + "</span>";
        res = res + '\n';
        s_comment = false;
      }else if(m_s_comment == true && code[i] == '\'' && code[i+1] == '\'' && code[i+2] == '\''){
        res = res + "\'\'\'";
        res = res + "</span>";
        i += 2;
        m_s_comment = false;
      }else if(m_d_comment == true && code[i] == '\"' && code[i+1] == '\"' && code[i+2] == '\"'){
        res = res + "\"\"\"";
        res = res + "</span>";
        i += 2;
        m_d_comment = false;
      }else if(s_comment || m_s_comment || m_d_comment){
        res += code[i];
      }else if(code[i] == '\'' && code[i+1] == '\'' && code[i+2] == '\''){
        res = res + "<span style=\"color:green\">";
        res = res + "\'\'\'";
        i += 2;
        m_s_comment = true;
      }else if(code[i] == '\"' && code[i+1] == '\"' && code[i+2] == '\"'){
        res = res + "<span style=\"color:green\">";
        res = res + "\"\"\"";
        i += 2;
        m_d_comment = true;
      }else if(code[i] == '#'){
        res = res + "<span style=\"color:green\">";
        res = res + "#";
        s_comment = true;
      }else{
        if(single_quote == true && code[i] == '\\' && code[i+1] == '\''){
          res = res + code[i] + code[i+1];
          i++;
        }else if(single_quote == true && code[i] == '\''){
          res = res + code[i];
          res = res + "</span>";
          single_quote = false;
        }else if(double_quote == true && code[i] == '\\' && code[i+1] == '\"'){
          res = res + code[i] + code[i+1];
          i++;
        }else if(double_quote == true && code[i] == '\"'){
          res = res + code[i];
          res = res + "</span>";
          double_quote = false;
        }else if(double_quote || single_quote){
          res = res + code[i];
        }else if(code[i] == '\''){
          res = res + "<span style=\"color:green\">";
          res = res + code[i];
          single_quote = true;
        }else if(code[i] == '\"'){
          res = res + "<span style=\"color:green\">";
          res = res + code[i];
          double_quote = true;
        }else{
          res = res + code[i];
        }
      }
    }
    // console.log("this is res ==========");
    // console.log(res);
    let arr = [];
    let c = 0;
    for(let i = 6;i<res.length;i++){
      if(res.substring(i-6,i+1) == "</span>"){
        arr.push(res.substring(c,i+1));
        c = i+1;
      }
    }

    arr.push(res.substring(c,res.length));
    
    let brr = [];
    for(let i = 0;i<arr.length;i++){
      let temp = "";
      let temp1 = "";
      let ok = false;
      for(let j = 0;j<arr[i].length;j++){
        if(arr[i][j] == '<'){
          ok = true;
        }

        if(ok){
          temp = temp + arr[i][j];
        }else{
          temp1 = temp1 +  arr[i][j];
        }
      }
      if(temp1 != "")
        brr.push(temp1);
      if(temp != "")
        brr.push(temp);
    }
    for(var i = 0;i<brr.length;i++){
      console.log(i + "-----------" + brr[i]);
    }
    for(var i = 0;i<brr.length;i++){
      if(brr[i][0] != '<'){
        for(var j = 0;j<py.length;j++){
          let regex = new RegExp('\\b' + py[j] +'\\b','g');
          brr[i] = brr[i].replace(regex, '<span style="color:blue;font-weight:bold;">' + py[j] + '</span>');
        }
        brr[i] = brr[i].replace(/\b(\d+)\b/g,'<span style="color:green;">' + '$1' + "</span>");
        brr[i] = brr[i].replace(/{/g,'<span style="color:black;">' + '{' + "</span>");
        brr[i] = brr[i].replace(/}/g,'<span style="color:black;">' + '}' + "</span>");
        brr[i] = brr[i].replace(/\(/g,'<span style="color:red;">' + '(' + "</span>");
        brr[i] = brr[i].replace(/\)/g,'<span style="color:red;">' + ')' + "</span>");
        brr[i] = brr[i].replace(/\[/g,'<span style="color:purple;">' + '[' + "</span>");
        brr[i] = brr[i].replace(/]/g,'<span style="color:purple;">' + ']' + "</span>");
        brr[i] = brr[i].replace(/((^#[a-z]+)|([\n\r]#[a-z]+))/g,'<span style="color:purple;">' + '$1' + "</span>");
      }
      final_code = final_code + brr[i];
    }
  }else{
    let res = ""; 
    let s_cmt = false; 
    let m_cmt = false;
    let n = code.length;
    let double_quote = false;
    let single_quote = false;

    for (let i=0; i<n; i++){  
        if (s_cmt == true && code[i] == '\n') {
            res = res + "</span>";
            res = res + '\n';
            s_cmt = false; 
        }else if  (m_cmt == true && code[i] == '*' && code[i+1] == '/'){ 
            res = res + "*/</span>";
            m_cmt = false;
            i++; 
        }else if (s_cmt || m_cmt){
            res = res + code[i];
        }else if (code[i] == '/' && code[i+1] == '/'){
            res = res + "<span style=\"color:green\">//";
            s_cmt = true;
            i++; 
        }else if (code[i] == '/' && code[i+1] == '*'){ 
            res = res + "<span style=\"color:green\">/*";
            m_cmt = true;
            i++; 
        }else{
            if(double_quote == true && code[i] == '\\' && code[i+1] == '\"'){
                res = res + code[i] + code[i+1];
                i++;
            }else if(double_quote == true && code[i] == '\"'){
                res = res + code[i] + "</span>";
                double_quote = false;
            }else if(single_quote == true && code[i] == '\\' && code[i+1] == '\''){
                res = res + code[i] + code[i+1];
                i++;
            }else if(single_quote == true && code[i] == '\''){
                res = res + code[i] + "</span>";
                single_quote = false;
            }else if(double_quote || single_quote ){
                res = res + code[i];
            }else if(code[i] == '\"'){
                res = res + "<span style=\"color:red\">\"";
                double_quote = true;
            }else if(code[i] == '\''){
                res = res + "<span style=\"color:red\">\'";
                single_quote = true;
            }else{
                res = res + code[i];
            }
        } 
    }

    let arr = [];
    let c = 0;

    for(let i = 6;i<res.length;i++){
      if(res.substring(i-6,i+1) == "</span>"){
        arr.push(res.substring(c,i+1));
        c = i+1;
      }
    }

    arr.push(res.substring(c,res.length));
    
    let brr = [];
    for(let i = 0;i<arr.length;i++){
      let temp = "";
      let temp1 = "";
      let ok = false;
      for(let j = 0;j<arr[i].length;j++){
        if(arr[i][j] == '<'){
          ok = true;
        }

        if(ok){
          temp = temp + arr[i][j];
        }else{
          temp1 = temp1 +  arr[i][j];
        }
      }
      if(temp1 != "")
        brr.push(temp1);
      if(temp != "")
        brr.push(temp);
    }
    switch(lang){
      case "cpp":
        for(var i = 0;i<brr.length;i++){
          if(brr[i][0] != '<'){
            for(var j = 0;j<cpp.length;j++){
              let regex = new RegExp('\\b' + cpp[j] +'\\b','g');
              brr[i] = brr[i].replace(regex, '<span style="color:blue;font-weight:bold;">' + cpp[j] + '</span>');
            }
            brr[i] = brr[i].replace(/\b(\d+)\b/g,'<span style="color:green;">' + '$1' + "</span>");
            brr[i] = brr[i].replace(/{/g,'<span style="color:red;">' + '{' + "</span>");
            brr[i] = brr[i].replace(/}/g,'<span style="color:red;">' + '}' + "</span>");
            brr[i] = brr[i].replace(/\(/g,'<span style="color:black;">' + '(' + "</span>");
            brr[i] = brr[i].replace(/\)/g,'<span style="color:black;">' + ')' + "</span>");
            brr[i] = brr[i].replace(/\[/g,'<span style="color:purple;">' + '[' + "</span>");
            brr[i] = brr[i].replace(/]/g,'<span style="color:purple;">' + ']' + "</span>");
            brr[i] = brr[i].replace(/((^#[a-z]+)|([\n\r]#[a-z]+))/g,'<span style="color:purple;">' + '$1' + "</span>");
          }
          final_code = final_code + brr[i];
        }

        break;
      case "java":
          for(var i = 0;i<brr.length;i++){
            console.log(brr[i]);
          }
          for(var i = 0;i<brr.length;i++){
            if(brr[i][0] != '<'){
              for(var j = 0;j<java.length;j++){
                let regex = new RegExp('\\b' + java[j] +'\\b','g');
                brr[i] = brr[i].replace(regex, '<span style="color:blue;font-weight:bold;">' + java[j] + '</span>');
              }
              brr[i] = brr[i].replace(/\b(\d+)\b/g,'<span style="color:green;">' + '$1' + "</span>");
              brr[i] = brr[i].replace(/{/g,'<span style="color:red;">' + '{' + "</span>");
              brr[i] = brr[i].replace(/}/g,'<span style="color:red;">' + '}' + "</span>");
              brr[i] = brr[i].replace(/\(/g,'<span style="color:black;">' + '(' + "</span>");
              brr[i] = brr[i].replace(/\)/g,'<span style="color:black;">' + ')' + "</span>");
              brr[i] = brr[i].replace(/\[/g,'<span style="color:purple;">' + '[' + "</span>");
              brr[i] = brr[i].replace(/]/g,'<span style="color:purple;">' + ']' + "</span>");
              brr[i] = brr[i].replace(/((^#[a-z]+)|([\n\r]#[a-z]+))/g,'<span style="color:purple;">' + '$1' + "</span>");
            }
            final_code = final_code + brr[i];
          }
          break;
      default:
          for(var i = 0;i<brr.length;i++){
            if(brr[i][0] != '<'){
              for(var j = 0;j<c11.length;j++){
                let regex = new RegExp('\\b' + c11[j] +'\\b','g');
                brr[i] = brr[i].replace(regex, '<span style="color:blue;font-weight:bold;">' + c11[j] + '</span>');
              }
              brr[i] = brr[i].replace(/\b(\d+)\b/g,'<span style="color:green;">' + '$1' + "</span>");
              brr[i] = brr[i].replace(/{/g,'<span style="color:red;">' + '{' + "</span>");
              brr[i] = brr[i].replace(/}/g,'<span style="color:red;">' + '}' + "</span>");
              brr[i] = brr[i].replace(/\(/g,'<span style="color:black;">' + '(' + "</span>");
              brr[i] = brr[i].replace(/\)/g,'<span style="color:black;">' + ')' + "</span>");
              brr[i] = brr[i].replace(/\[/g,'<span style="color:purple;">' + '[' + "</span>");
              brr[i] = brr[i].replace(/]/g,'<span style="color:purple;">' + ']' + "</span>");
              brr[i] = brr[i].replace(/((^#[a-z]+)|([\n\r]#[a-z]+))/g,'<span style="color:purple;">' + '$1' + "</span>");
            }
            console.log(i + "--------------------" + brr[i]);
            final_code = final_code + brr[i];
          }     
    }
  }
    
    //console.log(final_code);
    codeelement.innerHTML = final_code;
}