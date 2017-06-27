app.controller('CatalogueController', ['$scope', function($scope) {
    //  телефонный справочник
var catal = function() { 
    $("#catalogue").my({
	params:{delay:20},

	//Initial data 
	data:{
		sort:"Ф-л/ЦБУ", 
		search:"", 
		result:[]
	},
	
	error:"Something went wrong.<br>{message}",
	
	require:[
		{
			"this.List":{
				url:"/js/data.json",
				dataType:"json",
				cache:false
			}
		}
	],

	// Inits form
	init: function ($form, form){
		var that = this, 
				d = form.data,
				list;
		// Build HTML
		$form
		.html(that.HTML.join(""))
		.on("click", "x", function ($evt) {
			$form.find("#search").val($(this).text()).blur();
		});
		
		// index data
		list = that.List.map(function(e){
			e.index=[e.unitGo, e.post, e.unit, e.city, e.respons, e.lastname, e.firstname, e.surname, e.phone, e.mobilework, e.mobileown].join(" "); 
			return e;
		});
	},

	//UI bindings
	ui:{
		"#sort":{
			bind:"sort", 
			init: function ($node) { 
				//Initializing $.tags plugin
				$node.tags({tags:[["Имя ↓","Ф-л/ЦБУ","Подразделение"]]})
			}
		},
		"#search":{
			bind:"search",  
			//conditional formatting, fills control with yellow
			css:{"my-search": /^[^\s][^\s]+/}
		},
		"#result":{
			delay:100,

			//Controls to watch
			watch:"#search,#sort",

			// Function that sorts, filters and renders results,
			// returns summary string for div#result.
			bind: function (data, value, $node) {
				var that = this,
						$tbody = $node.my("find","tbody"), 
						range = data.range, 
						search = data.search.compact();
				//Filtering by age
				var a = this.List.filter(function(e){
					return e
				});
				//Applying search if any
				if (search.length) {
					var re = new RegExp(RegExp.escape(search),"i");
					var a = a.filter(function(e){return re.test(e.index)});
				};
				//Sorting and rendering table
				$tbody.html(
					a.sort(this.Sorters[data.sort])
					.reduce(
						function(trail,e){
							return trail+that.Row.assign(e)
						},
						""
					)
				);
				data.result=a;

				//Compositing info line
				return "Найдено: "+a.length;
			}
		}
	},
	
	// Sorter fuctions
	Sorters:{
		"Ф-л/ЦБУ":  function(x,y){
			return x.unit==""?10:y.unit==""?-10:x.unit<y.unit?-1:x.unit==y.unit?0:1
		},
		"Подразделение":function(x,y){return x.unitGo<y.unitGo?-1:x.unitGo==y.unitGo?0:1},
		"Имя ↓":  function(x,y){
			return (x.lastname||x.lastname)<(y.lastname||y.lastname).trim()?-1:x.lastname==y.lastname?0:1
		}
  },
	
	// HTML skeleton
	HTML:[
		'<h3>Каталог</h3>',
		'<div class="nav">',
			'<span class="group">Сортировать по: <span id="sort"></span></span> ',
			'<div class="searchgroup">',
			'<input type="text" id="search" class="ui-search" value=""/>',
			'<img src="../images/cross-small.png" class="ui-search-clear" '
				+'onclick="$(this).siblings(\'input:eq(0)\').val(\'\').blur()"/>',
			'</div>',
		'</div>',
		'<div id="result"></div>',
		'<div id="table">',
			'<table width=100% border=0>',
				'<tbody></tbody>',
			'</table>',
		'</div>'
	],
	// Row template
	Row:'<tr><td width=20%><x>{lastname}</x> <x>{firstname}</x> <x>{surname}</x></td>'
		+'<td width=100><x>{post}</x></td>'
		+'<td width=100><x>{unitGo}</x></td><td width=8%><x>{unit}</x></td>'
        +'<td width=10%><x>{city}</x></td><td width=10%><x>{ phone}</x></td>'
        +'<td width=10%><x>{mobilework}</x></td><td width=10%><x>{mobileown}</x></td></tr>',
	
	// stylesheet
	style:{
		//"":"background-color: rgba(241,255,249,.9);",
		' h3':'border-bottom: 1px solid rgba(35, 118, 200, 0.25);'
			+'margin:0 0 10px 0;padding:0 0 15px 0;',
		".nav":"padding-top:8px; height:40px; border:1px dotted #aaa; "
			+"border-width:1px 0 1px 0",
		" .nav .group ":"margin-right:10px",
		" #range":"width:150px; display:inline-block; margin-left: 15px;font-size:1em;",
		" .searchgroup":"width:300px; display:inline-block; float:right;",
		" .searchgroup input":"margin:0; width:300px; font-size:0.9em;line-height:1.2em",
		" #result":"margin:10px 0 0 0; padding-bottom:10px; "
			+"border-bottom:1px dotted #aaa;",
		" #sort":"font-size:95%;margin-left:3px;",
		" #table":{
			"":"min-height:700px;max-height:700px;overflow-y:scroll;overflow-y:overlay; " 
				+"border-bottom:1px solid rgba(35, 118, 200, 0.25); overflow-x:hidden;",
			" table tr:nth-child(2n)":"background-color: rgba(129,201,166,.6)",
			" table td ":"padding:5px 0 6px 2px;",
			" tr x ":"cursor:pointer; transition:border-bottom-color 0.3s, color 0.3s; "
				+"transition:border-bottom-color 0.3s, color 0.3s; " 
				+"border-bottom:1px solid rgba(84,129,160,0);"
				+"padding-bottom:0;",
			" tr:hover x":"color:#2EA66C;border-bottom:1px solid rgba(84,129,160,0.8)",
			" tr x:hover":"color:#A3293D;border-bottom-color:rgba(163,41,61,0.8)"
		},
		" .ui-search-clear":"margin: -4px 0 -3px -21px!important;"
	}
});
};
$(document).ready(catal);
}]);