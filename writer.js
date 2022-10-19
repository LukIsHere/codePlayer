ivar plain = 0
var cpp = 1
var js = 2
var s_t = document.getElementById("start")
var m_t = document.getElementById("middle")
var e_t = document.getElementById("end")
var data;
var examp = [
    {
        s:"hi",
        m:"im writing\nsth",
        e:"end"
    },
    {
        s:"#include <iostream>\n#define bc 0D\ntemplate<typename T>",
        m:"typedef int at;\nint gg(){//comment\n\n};\nint ww;\nclass foo{\n    public:\n        int x;\n        &bool operator==(foo s){\n            return true;\n        }\n        foo(){\n        }\n        int cpp(){\n        }\n}",
        e:'int main(){\n    int* cc;\n    &foo oj;\n    ww + ffdd(ww);\n    int w = ww;\n    foo c("hi");\n    c.go();\n    c.www;\n    for(int i = 0;10>i;i++){\n        go();\n    }//bruh\n    std::cout << "hi" << std::endl;\n}'
    },
    {
        s:"class foo{\n    k;\n    constructor(){\n        var i = 0\n    }\n}",
        m:"var i = 0;\nfunction aa(){\n\n}\nfor(var ii = 0;10>ii;ii++){\n    if(i==3){\n        aa\n        gg();\n        i\n        var ex = new foo();\n        var c = false;//hi\n        /*\n        lubie\n        */\n    }\n}",
        e:'function jj(){n    console.log("hi")\n   \'bruh\'\n}'
    }
]
document.getElementById("lang").onchange = ()=>{
    
    var l = (document.getElementById("lang").value*1)
    s_t.innerHTML = examp[l].s
    m_t.innerHTML = examp[l].m
    e_t.innerHTML = examp[l].e
    data = new analize(s_t.value,m_t.value,e_t.value,cpp)
    data.preview()
}
function hs(){
    document.getElementById("input").classList.add("hiden")
    animate()
}
m_t.addEventListener("change",() => {
    data = new analize(s_t.value,m_t.value,e_t.value,cpp)
    data.preview()
})
document.getElementById("bg").onchange = ()=>{
    document.body.style.backgroundColor = document.getElementById("bg").value
}
document.ondblclick = ()=>{
    
}

function c(color,word){
    return {c:('<c class="'+color+'">'),w:word}
}

function animate(){
    data = new analize(s_t.value,m_t.value,e_t.value,cpp)
    data.print()
}
  

class analize{
    raw
    out = []
    outs = []
    oute = []
    type
    vars = [] //b
    classes = [] //g
    functions = [] //y
    definitions = []//db
    //curl bd
    //"/' o
    constructor(start,middle,end,type){
        this.raw = {
            s : start.split("\n"),
            m : middle.split("\n"),
            e : end.split("\n")
        }
        this.type = document.getElementById("lang").value
        switch (this.type*1) {
            case plain:
                this.outs = this.decodenone(start)
                this.out = this.decodenone(middle)
                this.oute = this.decodenone(end)
                break;
            case cpp:
                this.outs = this.decodecpp(start)
                this.out = this.decodecpp(middle)
                this.oute = this.decodecpp(end)
                console.log("cpp")
                break;
            case js:
                this.outs = this.decodejs(start)
                this.out = this.decodejs(middle)
                this.oute = this.decodejs(end)
                break;
        }
        console.log(this)
    }
    decodenone(data){
        var input = data.split("\n")
        var outm = [];
        input.forEach((oline,ind)=>{
            outm[ind] = []
            outm[ind].push(c("w",oline))
            outm[ind].push(c("w","  "))
        })
        return outm
    }
    decodejs(data){
        var input = data.split("\n")
        var outm = [];
        var curll=0;
        var comment2 = false
        input.forEach((oline,ind)=>{
            console.log(oline)
            outm[ind] = [];
            var word = "";
            var string = false;
            var string2 = false;
            var inside = "";
            var char;
            var comment = false
            for(var i = 0;i<oline.length+1;i++){
                if(i==oline.length)char=" ";
                else char=oline.charAt(i);
                var nchar = oline.charAt(i+1);
                var fs = false;
                if(char=='"'&&!string){
                    string = true;
                    fs==true
                }
                var fs2 = false;
                if(char=="'"&&!string2){
                    string2 = true;
                    fs2==true
                }
                if(jskw.reseter.includes(char)){
                    //keywords
                    if(string||string2){
                        outm[ind].push(c("o",word))
                    }else if(comment||comment2){
                        outm[ind].push(c("dg",word))
                    }else if(this.classes.includes(word)){
                        outm[ind].push(c("g",word))
                    }else if(jskw.struct.includes(word)){
                        inside = "cdef"
                        outm[ind].push(c("db",word))
                    }else if(jskw.justblue.includes(word)){
                        outm[ind].push(c("db",word))
                    }else if(inside=="vard"){
                        if(word!=""){
                            if(!this.vars.includes(word))this.vars.push(word);
                            outm[ind].push(c("b",word))
                            inside  = ""
                        }
                    }else if(inside=="cdef"){
                        if(word!=""){
                            if(!this.classes.includes(word))this.classes.push(word);
                            outm[ind].push(c("g",word))
                            inside  = ""
                        }
                    }else if(inside=="func"){
                        if(word!=""){
                            if(!this.functions.includes(word))this.functions.push(word);
                            outm[ind].push(c("y",word))
                            inside  = ""
                        }
                    }else if(this.functions.includes(word)){
                        outm[ind].push(c("y",word))
                    }else if(jskw.functions.includes(word)){
                        inside = "func"
                        outm[ind].push(c("db",word))
                    }else if(jskw.varNames.includes(word)){
                        inside = "vard";
                        outm[ind].push(c("db",word))
                    }else if(jskw.keywords.includes(word)){
                        outm[ind].push(c("p",word))
                    }else if(!isNaN(word)){
                        outm[ind].push(c("a",word))
                    }else if(char=="("){
                        outm[ind].push(c("y",word))
                    }else{
                        outm[ind].push(c("b",word))
                    }
                    //reseter
                    if(string||string2){
                        outm[ind].push(c("o",char))
                    }else if(comment||comment2){
                        if(char=="*"&&nchar=="/"){
                            i++;
                            outm[ind].push(c("dg","*/"))
                            comment2=false;
                        }else outm[ind].push(c("dg",char))
                    }else if(char=="/"&&nchar=="*"){
                        outm[ind].push(c("dg","/*"))
                        i++
                        comment2=true
                    }else if(char=="{"||char=="("||char=="["){
                        var cs = curll%3
                        curll++
                        if(cs==0)outm[ind].push(c("p",char))
                        if(cs==1)outm[ind].push(c("db",char))
                        if(cs==2)outm[ind].push(c("y",char))
                    }else if(char=="/"&&nchar=="/"){
                        i++;
                        outm[ind].push(c("dg","//"))
                        comment = true
                    }else if(char=="}"||char==")"||char=="]"){
                        curll--
                        var cs = curll%3
                        if(cs==0)outm[ind].push(c("p",char))
                        if(cs==1)outm[ind].push(c("db",char))
                        if(cs==2)outm[ind].push(c("y",char))
                    }else{
                        outm[ind].push(c("w",char))
                    }
                    if(char=='"'&&string&&!fs&&!string2){
                        string = false;
                    }
                    if(char=="'"&&string2&&!fs2&&!string){
                        string2 = false;
                    }
                    word="";
                }else{
                    word+=char;
                    
                }
            }
        })
        return outm;
    }
    decodecpp(data){
        var input = data.split("\n")
        var outm  = [];
        var color = "w";
        var word = "";
        var char = "";
        var typer = 0;
        var where = ["start"];
        var classn;
        var curll = 0;
        var comment2 = false
        input.forEach((oline,ind) => {
            outm[ind] = []
            console.log(oline)
            var words;
            var type;
            var char;
            var index = 0;
            var inside = "";
            var string = false;
            var string2 = false;
            var comment = false;
            var mbf = 0
            var endd = false
            for(var i = 0;i<(oline.length)+1;i++){
                if(oline.length==i)char = " ";
                else char = oline.charAt(i);
                var nchar;
                if(i+1>=oline.length)nchar=" "
                else nchar = oline.charAt(i+1)
                if(char=="."||char=="::")inside = "vof";
                if(char=='"'&&!string2){
                    if(!string)string = true
                }
                if(char=="'"&&!string){
                    if(!string2)string2 = true
                    string2 = !string2
                }
                
                if(cppkw.reseter.includes(char)){
                    console.log(word)
                    if(string||string2){
                        outm[ind].push(c("o",word))
                    }else if(comment||comment2){
                        outm[ind].push(c("dg",word))
                    }else if(word==""){

                    }else if(inside=="inc"){
                        outm[ind].push(c("o",word))
                    }else if(inside=="def"){
                        outm[ind].push(c("db",word))
                        if(!this.definitions.includes(word))this.definitions.push(word)
                        inside = ""
                    }else if(inside=="td2"&&word!=""){
                        if(!this.classes.includes(word))this.classes.push(word);
                        inside = "td"
                        outm[ind].push(c("g",word))
                    }else if(inside=="tdf"&&word!=""){
                        if(oline.length==i||char==";"){
                            outm[ind].push(c("g",word))
                            if(!this.classes.includes(word))this.classes.push(word);
                        }else{
                            outm[ind].push(c("db",word))
                        }
                        
                    }else if(inside=="td"&&word!=""){
                        inside = "td2"
                        outm[ind].push(c("db",word))
                    }else if(cppkw.keywords.includes(word)){
                        outm[ind].push(c("p",word))
                    }
                    else if(cppkw.preComp.includes(word)){
                        if(word=="#include"){
                            inside = "inc"
                        }else if(word = "#define"){
                            inside = "def"
                        }
                        outm[ind].push(c("p",word))
                    }else if(endd){
                        if(this.classes.includes(word)){
                            outm[ind][outm[ind].length-1]=(c("g","&"+word))
                        }else if(cppkw.varNames.includes(word)){
                            outm[ind][outm[ind].length-1]=(c("db","&"+word))
                        }
                    }else if(cppkw.typdef.includes(word)){
                        if(word=="typedef") inside = "tdf"
                        else inside = "td"
                        outm[ind].push(c("db",word))
                    }else if(cppkw.varNames.includes(word)||cppkw.atr.includes(word)||cppkw.predef.includes(word)){
                        inside = "vard"
                        outm[ind].push(c("db",word))
                        
                    }else if(cppkw.struct.includes(word)){
                        outm[ind].push(c("db",word))
                        inside ="classname";
                    }else if(char=="("){
                        if(classn!=word){
                            var fin = 0
                            var fin2 = 0
                            var lc = 0
                            for(var ii = 0;input.length>ii;ii++){
                                lc == input[ind+1].charAt(ii)
                                if(lc=="{"){
                                    fin2=1
                                    break
                                }else if(lc==" "||lc==" "){

                                }else{
                                    break
                                }
                            }
                            for(var ii = i;ii<oline.length;ii++){
                                lc = oline.charAt(ii)
                                if(lc==" "||lc=="   "){

                                }else if(lc==")"){
                                    fin = 1
                                }else if(lc=="{"&&fin==1){
                                    fin = 2
                                    break;
                                }else if(lc=="/"&&oline.charAt(ii-1)=="/"){
                                    break
                                }else fin = 0
                            }
                            if(oline.charAt(oline.length-1)=="{"||fin==2||input[ind+1].charAt(0)=="{"||inside=="vof"){
                                outm[ind].push(c("y",word))
                                if(!this.functions.includes(word))this.functions.push(word);
                            }else if(inside!="vard"){
                                outm[ind].push(c("y",word))
                                
                            }
                            else outm[ind].push(c("b",word))
                        }else{
                            outm[ind].push(c("g",word))
                        }
                        
                    }else if(this.vars.includes(word)||inside=="vof"){
                        outm[ind].push(c("b",word))
                    }else if(this.definitions.includes(word)){
                        outm[ind].push(c("db",word))
                    }else if(this.classes.includes(word)){
                            inside = "vard";
                            outm[ind].push(c("g",word))
                    }else if(this.functions.includes(word)){
                        outm[ind].push(c("y",word))
                    }else{
                        if(inside=="classname"){
                            outm[ind].push(c("g",word))
                            classn = word;
                            this.classes.push(word);
                            where.push("class");
                        }else if(inside=="vard"&&word!=""){
                            outm[ind].push(c("b",word))
                            if(!this.vars.includes(word))this.vars.push(word);
                            inside = ""
                        }else if(word*1!=NaN){
                            outm[ind].push(c("a",word))
                        }else{
                            outm[ind].push(c("w",word))
                        }
                    }
                    //reseters
                    if(char=="/"&&nchar=="/")comment = true
                    if(char=="/"&&nchar=="*")comment2 = true
                    if(string||string2){
                        outm[ind].push(c("o",char))
                    }else if(comment||comment2){
                        outm[ind].push(c("dg",char))
                    }else if(char=="{"||char=="("||char=="["){
                        var cs = curll%3
                        curll++
                        if(cs==0)outm[ind].push(c("p",char))
                        if(cs==1)outm[ind].push(c("db",char))
                        if(cs==2)outm[ind].push(c("y",char))
                    }else if(char=="}"||char==")"||char=="]"){
                        curll--
                        var cs = curll%3
                        if(cs==0)outm[ind].push(c("p",char))
                        if(cs==1)outm[ind].push(c("db",char))
                        if(cs==2)outm[ind].push(c("y",char))
                    }else if(word=="operator"){
                        if(char=="["&&oline.charAt(i+1)=="]"){
                            i++
                            outm[ind].push(c("p","[]"))
                        }else if(char=="="&&oline.charAt(i+1)=="="){
                            i++
                            outm[ind].push(c("p","=="))
                        }else if(char=="+"&&oline.charAt(i+1)=="+"){
                            i++
                            outm[ind].push(c("p","++"))
                        }else if(char=="-"&&oline.charAt(i+1)=="-"){
                            i++
                            outm[ind].push(c("p","--"))
                        }else if(char==">"&&oline.charAt(i+1)=="="){
                            i++
                            outm[ind].push(c("p",">="))
                        }else if(char=="<"&&oline.charAt(i+1)=="="){
                            i++
                            outm[ind].push(c("p","<="))
                        }else if(char=="-"&&oline.charAt(i+1)==">"){
                            i++
                            outm[ind].push(c("p","->"))
                        }else if(char=="!"&&oline.charAt(i+1)=="="){
                            i++
                            outm[ind].push(c("p","!="))
                        }else{
                            outm[ind].push(c("p",char))
                        }
                    }else if(char=="*"&&this.classes.includes(word)){
                        outm[ind].push(c("g",char))
                    }else if(char=="*"&&cppkw.varNames.includes(word)){
                        outm[ind].push(c("db",char))
                    }else if(inside=="inc"){
                        outm[ind].push(c("o",char))
                    }else if(cppkw.atr.includes(word)){
                        outm[ind].push(c("db",char))
                    }else{
                        outm[ind].push(c("w",char))
                    }
                    if(char=="}"){
                        var exit = where.pop();
                        if(exit=="class"){
                            classn == ""
                        } 
                    }
                    if(char=="&")endd = true
                    else endd = false
                    index ++;
                    word = ""
                    if(char=='"'&&!string2){
                        if(string)string = false
                    }
                    if(char=="'"&&!string){
                        if(string2)string2 = false
                    }
                    if(char=="*"&&nchar=="/"){
                        i++;
                        outm[ind].push(c("dg","*/"))
                        comment = true
                    }
                }else{
                    word += char
                }
                
                
            }
            outm[ind].push(c("w",word))
            word = ""
        });
        return outm;
    }
    encode(input){
        var out = "";
        input.forEach(dd=>{
            dd.forEach(d=>{
                out+=d.c+d.w
            })
            out+="<p>"
        })
        return out
    }
    preview(){
        var inner = document.getElementById("m_out");
        inner.innerHTML = this.encode(this.outs)+this.encode(this.out)+this.encode(this.oute)
    }
    print(){
        var speed = document.getElementById("speed").value
        var inner = document.getElementById("m_out");
        console.log(document.getElementById("cur").value)
        var cur = (document.getElementById("cur").checked)
        var out = "";
        inner.innerHTML = "";
        var lines = this.out.length
        var words;
        var full = this.encode(this.out)
        var starto = this.encode(this.outs);
        if(starto==undefined)starto="";
        var endo = this.encode(this.oute);
        if(endo==undefined)endo="";
        var inline = 0;
        var inword = 0;
        var letter = 0;
        out+=this.out[inline][inword].c
        pcc(this.out);
        function pcc(input){
            words = input[inline].length
            if(lines-1==inline){
                inner.innerHTML = starto+ full +"<p>"+endo
                setTimeout(()=>{
                    document.getElementById("input").classList.remove("hiden")
                },3000)
                return
            }
            if(words==inword){
                    inline++
                    inword = 0
                    letter = 0
                    out += "<p>"
            }
            if(letter==0){
                out+=input[inline][inword].c
            }
            if(input[inline][inword].w.length==letter){
                if(words==inword){
                    debugger
                    
                }else{
                    
                    inword++
                    letter = 0
                }
            }else{
                out += input[inline][inword].w.charAt(letter)
                if(cur)inner.innerHTML = starto+out+"_"+"<p>"+endo
                else inner.innerHTML = starto+out+"<p>"+endo
                letter++
            }
            setTimeout(pcc, speed,input);
        }
        
    }
}

//js keywords
var jskw = {
    keywords : [
        "await",
        "break",
        "case",
        "catch",
        "continue",
        "default",
        "do",
        "else",
        "enum",
        "import",
        "finally",
        "for",
        "if",
        "instanceof",
        "interface",
        "new",
        "package",
        "return",
        "switch",
        "throw",
        "try",
        "while"
    ],
    justblue:[
        "debugger",
        "delete",
        "extends",
        "implements",
        "export",
        "in",
        "private",
        "protected",
        "public",
        "super",
        "static",
        "this",
        "typeof",
        "void",
        "with",
        "yield",
        "constructor"
    ],
    varNames:[
        "const",
        "let",
        "var"
    ],
    struct:[
        "class"
    ],
    functions:[
        "function"
    ],
    reseter : [
        "   ",
        " ",
        "{",
        "(",
        "[",
        "}",
        "]",
        ")",
        "<",
        ">",
        ":",
        ".",
        ";",
        '"',
        "'",
        "+",
        "-",
        "=",
        "*",
        "!",
        "&",
        "/"
    ],
    predef:[
        "false",
        "null",
        "true",
        "undefined"
    ]
}

//cpp keywords
var cppkw  = {
    keywords : [ //p
        "alignas",
        "alignof",
        "asm",
        "break",
        "case",
        "catch",
        "continue",
        "default",
        "delete",
        "do",
        "else",
        "for",
        "goto",
        "if",
        "operator",
        "new",
        "return",
        "sizeof",
        "switch",
        "throw",
        "try",
        "using",
        "while"

    ],
    varNames : [ //db
        "auto",
        "bool",
        "char",
        "char16_t",
        "char32_t",
        "double",
        "explicit",
        "export",
        "float",
        "int",
        "namespace",
        "thread_local",
        "typeid",
        "void",
        "wchar_t"
    ],
    preComp : [ //p
        "#include",
        "#if",
        "#elif",
        "#else",
        "#endif",
        "#ifdef",
        "#ifndef",
        "#define",
        "#undef",
        "#line",
        "#error",
        "#pragma"
    ],
    operators : [ //w
        "and",
        "and_eq",
        "bitand",
        "bitor",
        "compl",
        "not",
        "not_eq",
        "or",
        "or_eq",
        "xor",
        "xor_eq"
    ],
    struct : [ //db
        "class",
        "enum",
        "struct",
        "union"
    ],
    atr : [ //db
        "const",
        "const_cast",
        "dynamic_cast",
        "extern",
        "friend",
        "inline",
        "long",
        "mutable",
        "noexcept",
        "private",
        "protected",
        "public",
        "register",
        "reinterpret_cast",
        "short",
        "signed",
        "static",
        "static_assert",
        "static_cast",
        "typename",
        "unsigned",
        "virtual",
        "volatile"

    ],
    typdef : [ //db
        "typedef",
        "template"
    ],
    predef : [ //db
        "false",
        "nullptr",
        "true",
        "null",
        "this"
    ],
    reseter : [
        "   ",
        " ",
        "{",
        "(",
        "[",
        "}",
        "]",
        ")",
        "<",
        ">",
        ":",
        ".",
        ";",
        '"',
        "'",
        "+",
        "-",
        "=",
        "*",
        "!",
        "&",
        "/"
    ],
    std : [
        //to-do
    ]
}
/*
to-do c++

//precompile
final (C++11)
override (C++11)
if
elif
else
endif
ifdef
ifndef
define
undef
line
error
pragma
defined
*/
var data = new analize(s_t.value,m_t.value,e_t.value,cpp)
data.preview()
