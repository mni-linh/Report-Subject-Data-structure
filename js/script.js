
//script1
var arr_X = [0,
/*1*/640,
/*2*/320, 960,
/*3*/160, 480, 800, 1120,
/*4*/80, 240, 400, 560, 720, 880, 1040, 1200,
/*5*/40, 120, 200, 280, 360, 440, 520, 600, 680, 760, 840, 920, 1000, 1080, 1160, 1240,
/*6*/20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540, 580, 620, 660, 700, 740, 780, 820, 860, 900, 940, 980, 1020, 1060, 1100, 1140, 1180, 1220, 1260];

var arr_Y = [0,
/*1*/100,
/*2*/150, 150,
/*3*/200, 200, 200, 200,
/*4*/250, 250, 250, 250, 250, 250, 250, 250,
/*5*/300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
/*6*/350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350];

var arr_font = [25, 30, 35, 40, 45, 50];

var setting = [arr_font[0], "white","black" ];

function circle(x1, y1, num, N) {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(x1, y1, setting[0]-5, 0, 2 * Math.PI);
	if (N == Search_Animation) {
		ctx.fillStyle = 'green';
		ctx.fill();
	} else {
		ctx.fillStyle = setting[1];
		ctx.fill();
	}
	if (num > -1 && num < 10) {
		ctx.fillStyle = setting[2];
		ctx.font = '' + setting[0] + 'px Arial';
		ctx.fillText(num, x1 - (setting[0]-18) , y1 + 5 );
	} else if (num > -10 && num < 100) {
		ctx.fillStyle = setting[2];
		ctx.font = '' + setting[0] - 5 + 'px Arial';
		ctx.fillText(num, x1 - (setting[0]-15), y1 + 5);
	} else if (num > -100 && num < 1000) {
		ctx.fillStyle = setting[2];
		ctx.font = '' + setting[0] - 7 + 'px Arial';
		ctx.fillText(num, x1 - (setting[0]-8), y1 + 5);
	} else {
		ctx.fillStyle = setting[2];
		ctx.font = '' + setting[0] - 10 + 'px Arial';
		ctx.fillText(num, x1 - (setting[0]-5), y1 + 5);
	}
	ctx.strokeStyle = 'green';
	ctx.stroke();
};
function line_toRight(x1, y1, x2, y2) {
	var c = document.getElementById("myCanvas");
	var line = c.getContext("2d");
	line.moveTo(x1 + (setting[0]-5), y1 + (setting[0]-20));
	line.lineTo(x2, y2 - (setting[0]-5));
	line.lineWidth = 3;
	line.lineCap = 'square';
	line.strokeStyle = 'green';
	line.stroke();
};
function line_toLeft(x1, y1, x2, y2) {
	var c = document.getElementById("myCanvas");
	var line = c.getContext("2d");
	line.moveTo(x1 - (setting[0]-5), y1 + (setting[0]-20));
	line.lineTo(x2, y2 - (setting[0]-5));
	line.lineWidth = 3;
	line.lineCap = 'square';
	line.strokeStyle = 'green';
	line.stroke();
};

function Node_coordeinat(N, L, dir, val, N_Parent) {
	var x, y, x1, y1;
	x1 = arr_X[N_Parent];
	y1 = arr_Y[N_Parent];
	x = arr_X[N];
	y = arr_Y[N];
	circle(x, y, val, N);
	if (dir == 2) {
		line_toLeft(x1, y1, x, y);
	}
	if (dir == 1) {
		line_toRight(x1, y1, x, y);
	}
};
// /////////////////////////////////////////////////////////////////////////////////////////////
//script2

function node(pval) { //tạo node mới
	this.left = undefined; //node trái
	this.right = undefined; //node phải
	this.value = pval; //giá trị của node
	this.height = -1;
	this.N = 0;
	this.D = 0;
};

function AVLTree() { //tạo cây avl mới
	this._root = new node(); //biến root 
};

var Root_height = 0; //chiều cao của cây
var NewValueNumber, NewValueDir, Search_Animation = 0;
var bool = false,
	Button = false;
var SearchMap = [];

AVLTree.prototype.Last_Node_Number = function (NewValue) {
	return this.Get_Last_Node_Number(this._root, 1, NewValue);
};

AVLTree.prototype.Get_Last_Node_Number = function (pnode, X, NewValue) { // đệ quy
	if (pnode.value == null) {
		return X;
	} else if (NewValue < pnode.value) {
		return this.Get_Last_Node_Number(pnode.left, 2 * X, NewValue);
	} else if (NewValue > pnode.value) {
		return this.Get_Last_Node_Number(pnode.right, (2 * X) + 1, NewValue);
	} else if (NewValue == pnode.value) {
		return null;
	}
};

AVLTree.prototype.add = function (pval) { //thêm số vào cây
	this._root = this.add_worker(this._root, pval);
	Root_height = this._root.height;
};


AVLTree.prototype.add_worker = function (tmp, pval) { //đệ quy thêm số vào cây
	if (tmp.value == null) {
		if (SearchMap.length != 0) {
			if (SearchMap[SearchMap.length - 1][1] < pval)
				SearchMap.push([(2 * SearchMap[SearchMap.length - 1][0]) + 1, ""]);
			else
				SearchMap.push([2 * SearchMap[SearchMap.length - 1][0], ""]);
		} else {
			SearchMap.push([1, ""]);
		}
		if (!Trace) {
			SearchMap = [];
		};
		DisplayInsert(0, pval);

		tmp = new node(pval);
		if (!tmp.right) {
			tmp.right = new node(null);
		}
		if (!tmp.left) {
			tmp.left = new node(null);
		}
	} else if (tmp.value > pval) {
		SearchMap.push([tmp.N, tmp.value]);
		tmp.left = this.add_worker(tmp.left, pval);
	} else if (tmp.value < pval) {
		SearchMap.push([tmp.N, tmp.value]);
		tmp.right = this.add_worker(tmp.right, pval);
	} else if (tmp.value == pval) {
		SearchMap.push([tmp.N, tmp.value]);
	}
	tmp.height = (this.height_worker(tmp.left)) >= (this.height_worker(tmp.right)) 
	? this.height_worker(tmp.left) + 1 : this.height_worker(tmp.right) + 1;
	return tmp;
};

AVLTree.prototype.Balance = function (pval) { 
	this._root = this.Balance_worker(this._root, pval);
	Root_height = this._root.height;
	if (Button == false) {
		DisAble(false);
	} else {
		Button = false;
	}
};

AVLTree.prototype.Balance_worker = function (tmp, pval) {
	if (tmp.value == pval) {


	} else if (tmp.value > pval) {
		tmp.left = this.Balance_worker(tmp.left, pval);
		if (this.height_worker(tmp.left) - this.height_worker(tmp.right) == 2) {
			if (pval < tmp.left.value) {
				textarea.value += "....Rotate With Left Child....";
				DisAble(true);
				Button = true;
				this.NewNodes(tmp); //lưu nơi để xoay

				this.k1 = tmp.left;
				tmp.left = this.k1.right;
				this.k1.right = tmp;
				tmp.height = (this.height_worker(tmp.left)) >= (this.height_worker(tmp.right)) ? (this.height_worker(tmp.left)) + 1 : (this.height_worker(tmp.right)) + 1;
				this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) ? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
				tmp = this.k1;
				delete this.k1;

				this.GetNewPostion(tmp.right.N, tmp); //lưu nơi sau xoay
				rotateAnim(false); //hiệu ứng xoay
			} else {
				textarea.value += "....Double Rotate With Left Child....";
				DisAble(true);
				Button = true;
				this.NewNodes(tmp.left);

				this.k1 = tmp.left.right;
				tmp.left.right = this.k1.left;
				this.k1.left = tmp.left;
				tmp.left.height = (this.height_worker(tmp.left.left)) >= (this.height_worker(tmp.left.right)) ? (this.height_worker(tmp.left.left)) + 1 : (this.height_worker(tmp.left.right)) + 1;
				this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) ? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
				tmp.left = this.k1;

				this.GetNewPostion(tmp.left.left.N, tmp.left);
				New(tmp.value, tmp.N);
				NewPostion(tmp.value, tmp.N);
				rotateAnim(true);

				bool = true;
				this.NewNodes(tmp);

				this.k1 = tmp.left;
				tmp.left = this.k1.right;
				this.k1.right = tmp;
				tmp.height = (this.height_worker(tmp.left)) >= (this.height_worker(tmp.right)) ? (this.height_worker(tmp.left)) + 1 : (this.height_worker(tmp.right)) + 1;
				this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) ? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
				tmp = this.k1;
				delete this.k1;

				this.GetNewPostion(tmp.right.N, tmp);
				bool = false;
			}
		}

	} else if (tmp.value < pval) {
		tmp.right = this.Balance_worker(tmp.right, pval);
		if (this.height_worker(tmp.right) - this.height_worker(tmp.left) == 2) {

			if (pval > tmp.right.value) {
				textarea.value += "....Rotate With Right Child....";
				DisAble(true);
				Button = true;
				this.NewNodes(tmp);

				this.k1 = tmp.right;
				tmp.right = this.k1.left;
				this.k1.left = tmp;
				tmp.height = (this.height_worker(tmp.left)) >= (this.height_worker(tmp.right)) ? (this.height_worker(tmp.left)) + 1 : (this.height_worker(tmp.right)) + 1;
				this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) ? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
				tmp = this.k1;
				delete this.k1;

				this.GetNewPostion(tmp.left.N, tmp);
				rotateAnim(false);

			} else {
				textarea.value += "....Double Rotate With Right Child....";
				DisAble(true);
				Button = true;
				this.NewNodes(tmp.right);

				this.k1 = tmp.right.left;
				tmp.right.left = this.k1.right;
				this.k1.right = tmp.right;
				tmp.right.height = (this.height_worker(tmp.right.left)) >= (this.height_worker(tmp.right.right)) ? (this.height_worker(tmp.right.left)) + 1 : (this.height_worker(tmp.right.right)) + 1;
				this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) ? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
				tmp.right = this.k1;

				this.GetNewPostion(tmp.right.right.N, tmp.right);
				New(tmp.value, tmp.N);
				NewPostion(tmp.value, tmp.N);
				rotateAnim(true);

				bool = true;
				this.NewNodes(tmp);

				this.k1 = tmp.right;
				tmp.right = this.k1.left;
				this.k1.left = tmp;
				tmp.height = (this.height_worker(tmp.left)) >= (this.height_worker(tmp.right)) ? (this.height_worker(tmp.left)) + 1 : (this.height_worker(tmp.right)) + 1;
				this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) ? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
				tmp = this.k1;
				delete this.k1;

				this.GetNewPostion(tmp.left.N, tmp);
				bool = false;
			}
		}

	}
	tmp.height = (this.height_worker(tmp.left)) >= (this.height_worker(tmp.right)) ? this.height_worker(tmp.left) + 1 : this.height_worker(tmp.right) + 1;
	return tmp;
};

// hàm lấy chiều cao của cây
AVLTree.prototype.height_worker = function (pnode) {
	if (pnode)
		return pnode.height;
	else
		return -1;
};

AVLTree.prototype.NewNodes = function (subtree) {
	if (subtree.value == null)
		return;
	New(subtree.value, subtree.N);

	this.NewNodes(subtree.left);
	this.NewNodes(subtree.right);
};
AVLTree.prototype.GetNewPostion = function (x, subtree) {
	if (subtree.value == null)
		return;
	NewPostion(subtree.value, x);
	this.GetNewPostion(2 * x, subtree.left);
	this.GetNewPostion((2 * x) + 1, subtree.right);
};

AVLTree.prototype.RotatePrint = function () {
	return this.RotateGetPrint(this._root, 0, 1);
};
AVLTree.prototype.RotateGetPrint = function (pnode, ch, X) {
	if (pnode.value == null) {
		return undefined;
	} else {
		pnode.N = X;
		var N_Parent = this.GetParentLevel(pnode)[0];
		pnode.D = ch;
		var ch = true;
		for (var i = 0; i < NodeArray.length; i++) {
			if (pnode.value == NodeArray[i][0]) {
				ch = false;
				break;

			}
		}
		if (ch)
			Node_coordeinat(pnode.N, Root_height + 1, pnode.D, pnode.value, N_Parent);
		this.RotateGetPrint(pnode.left, 2, 2 * X);
		this.RotateGetPrint(pnode.right, 1, (2 * X) + 1);
	}
};

AVLTree.prototype.Print = function (NewValue) {
	return this.GetPrint(this._root, 0, 1, NewValue);
};

AVLTree.prototype.GetPrint = function (pnode, ch, X, NewValue) {
	if (pnode.value == null) {
		return undefined;
	} else {
		pnode.N = X;
		var N_Parent = this.GetParentLevel(pnode)[0];
		pnode.D = ch;
		if (pnode.value != NewValue) {
			Node_coordeinat(pnode.N, Root_height + 1, pnode.D, pnode.value, N_Parent);
		} else {
			NewValueNumber = pnode.N;
			NewValueDir = pnode.D;
		}
		this.GetPrint(pnode.left, 2, 2 * X, NewValue);
		this.GetPrint(pnode.right, 1, (2 * X) + 1, NewValue);
	}
};

AVLTree.prototype.GetParentLevel = function (psearch) {
	return this.GetParent(this._root, psearch);
};

AVLTree.prototype.GetParent = function (pnode, psearch) {
	if (pnode == psearch) {
		return [0, 0];
	} else if (psearch.value < pnode.value) {
		if (pnode.left == psearch) {
			return [pnode.N, pnode.value];
		}
		return this.GetParent(pnode.left, psearch);
	} else if (psearch.value > pnode.value) {
		if (pnode.right == psearch) {
			return [pnode.N, pnode.value];
		}
		return this.GetParent(pnode.right, psearch);
	}
};

AVLTree.prototype.search = function (psearch) { // để lấy số search
	var x = this._search_worker(this._root, psearch);
	Search_Animation = 0;
	return x;
};

AVLTree.prototype._search_worker = function (pnode, psearch) {
	if (pnode.value == null) {
		return undefined;
	} else if (psearch < pnode.value) {
		SearchMap.push([pnode.N, pnode.value]);
		return this._search_worker(pnode.left, psearch);
	} else if (psearch > pnode.value) {
		SearchMap.push([pnode.N, pnode.value]);
		return this._search_worker(pnode.right, psearch);
	} else if (psearch == pnode.value) {
		SearchMap.push([pnode.N, pnode.value]);
		return pnode.value;
	}
};

AVLTree.prototype.PREORDERTRAVERSAL = function () {
	this.PREORDERTRAVERSAL_worker(this._root);
	Search_Animation = 0;
	this.Print(null);
};

AVLTree.prototype.PREORDERTRAVERSAL_worker = function (pnode) {
	if (!pnode) {
		return undefined;
	} else {
		if (pnode.value != null) {
			SearchMap.push([pnode.N, pnode.value]);
		}
		this.PREORDERTRAVERSAL_worker(pnode.left);
		this.PREORDERTRAVERSAL_worker(pnode.right);
	}
};

AVLTree.prototype.INORDERTRAVERSAL = function () {
	this.INORDERTRAVERSAL_worker(this._root);
	Search_Animation = 0;
	this.Print(null);
};

AVLTree.prototype.INORDERTRAVERSAL_worker = function (pnode) {
	if (!pnode) {
		return undefined;
	} else {
		this.INORDERTRAVERSAL_worker(pnode.left);
		if (pnode.value != null) {
			SearchMap.push([pnode.N, pnode.value]);
		}
		this.INORDERTRAVERSAL_worker(pnode.right);
	}
};

AVLTree.prototype.POSTORDERTRAVERSAL = function () {
	this.POSTORDERTRAVERSAL_worker(this._root);
	Search_Animation = 0;
	this.Print(null);
};

AVLTree.prototype.POSTORDERTRAVERSAL_worker = function (pnode) {
	if (!pnode) {
		return undefined;
	} else {
		this.POSTORDERTRAVERSAL_worker(pnode.left);
		this.POSTORDERTRAVERSAL_worker(pnode.right);
		if (pnode.value != null) {
			SearchMap.push([pnode.N, pnode.value]);
		}
	}
};

AVLTree.prototype.clear = function () {
	this._root = new node();
};

AVLTree.prototype.delete_node = function (psearch) {
	this.delete_final(psearch, this._root);
};

// Lấy hệ số cân bằng của nút n
AVLTree.prototype.getBalance = function (N) {
	if (N.value == null)
		return 0;
	return this.height_worker(N.left) - this.height_worker(N.right);
};


AVLTree.prototype.minValueNode = function (node) {
	this.current = node;

	// lặp lại tìm lá ngoài cùng bên trái
	while (this.current.left.value != null)
		this.current = this.current.left;

	return this.current;
};
AVLTree.prototype.delete_node = function (psearch) {
	this._root = this.deleteNode(this._root, psearch);
};
AVLTree.prototype.deleteNode = function (root, value) {
	// delte
	if (root.value == null)
		return root;
	//Nếu giá trị được xóa nhỏ hơn giá trị của gốc, thì nó sẽ nằm trong cây con bên trái
	if (value < root.value)
		root.left = this.deleteNode(root.left, value);
	// Nếu giá trị được xóa lớn hơn giá trị của gốc, thì nó sẽ nằm trong cây con bên trái
	else if (value > root.value)
		root.right = this.deleteNode(root.right, value);
	// nếu giá trị giống với giá trị của root, thì Đây là nút bị xóa
	else {
		// nút chỉ có một nút con hoặc không có nút con
		if ((root.left.value == null) || (root.right.value == null)) {
			this.temp = root.left.value ? root.left : root.right;
			if (this.temp.value == null) {
				this.temp = root;
				root = new node(null);;
			} else
				root = this.temp;
			delete temp;
		} else {
			//Nhận phần ở cấp nhỏ hơn - nhỏ nhất trong cây con bên phải
			this.temp = this.minValueNode(root.right);
			root.value = this.temp.value;
			root.right = this.deleteNode(root.right, this.temp.value);
		}
	}
	// nếu chỉ có 1 node thì trả về
	if (root.value == null)
		return root;
	// cập nhật chiều cao của node hiện tại
	root.height = (this.height_worker(root.left)) >= (this.height_worker(root.right)) 
	? this.height_worker(root.left) + 1 : this.height_worker(root.right) + 1;
	// Kiểm tra xem node đang xét có không cân bằng không
	var balance = this.getBalance(root);
	// Nếu node đang xét mà mất cân bằng, thì có 4 trường hợp
	// Trường hợp trái trái
	if (balance > 1 && this.getBalance(root.left) >= 0) {
		//Xoay trái cây con
		this.k1 = root.left;
		root.left = this.k1.right;
		this.k1.right = root;
		root.height = (this.height_worker(root.left)) >= (this.height_worker(root.right)) 
		? (this.height_worker(root.left)) + 1 : (this.height_worker(root.right)) + 1;
		this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) 
		? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
		root = this.k1;
		delete this.k1;
	}
	// Trường hợp trái phải
	if (balance > 1 && this.getBalance(root.left) < 0) {
		//Xoay đôi với cây con trái
		this.k1 = root.left.right;
		root.left.right = this.k1.left;
		this.k1.left = root.left;
		root.left.height = (this.height_worker(root.left.left)) >= (this.height_worker(root.left.right)) 
		? (this.height_worker(root.left.left)) + 1 : (this.height_worker(root.left.right)) + 1;
		this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) 
		? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
		root.left = this.k1;
		this.k1 = root.left;
		root.left = this.k1.right;
		this.k1.right = root;
		root.height = (this.height_worker(root.left)) >= (this.height_worker(root.right)) 
		? (this.height_worker(root.left)) + 1 : (this.height_worker(root.right)) + 1;
		this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) 
		? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
		root = this.k1;
		delete this.k1;
	}
	// Trường hợp phải phải
	if (balance < -1 && this.getBalance(root.right) <= 0) {
		//Xoay phải cây con
		this.k1 = root.right;
		root.right = this.k1.left;
		this.k1.left = root;
		root.height = (this.height_worker(root.left)) >= (this.height_worker(root.right)) 
		? (this.height_worker(root.left)) + 1 : (this.height_worker(root.right)) + 1;
		this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) 
		? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
		root = this.k1;
		delete this.k1;
	}
	// Trường hợp phải trái
	if (balance < -1 && this.getBalance(root.right) > 0) {
		//Xoay đôi với cây con phải
		this.k1 = root.right.left;
		root.right.left = this.k1.right;
		this.k1.right = root.right;
		root.right.height = (this.height_worker(root.right.left)) >= (this.height_worker(root.right.right)) 
		? (this.height_worker(root.right.left)) + 1 : (this.height_worker(root.right.right)) + 1;
		this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) 
		? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
		root.right = this.k1;
		this.k1 = root.right;
		root.right = this.k1.left;
		this.k1.left = root;
		root.height = (this.height_worker(root.left)) >= (this.height_worker(root.right)) 
		? (this.height_worker(root.left)) + 1 : (this.height_worker(root.right)) + 1;
		this.k1.height = (this.height_worker(this.k1.left)) >= (this.height_worker(this.k1.right)) 
		? (this.height_worker(this.k1.left)) + 1 : (this.height_worker(this.k1.right)) + 1;
		root = this.k1;
		delete this.k1;
	}
	return root;
};

// /////////////////////////////////////////////////////////////////////////////////////////////
// script 3
var NodeArray = [];		
var NodeArray1 = [];	
function New(value, pos) {//lưu vị trí cũ rồi xoay
    var arr = [value, pos, , 0, 0];
    if (bool) { // xoáy đôi
        NodeArray1.push(arr);
    }
    else {
        NodeArray.push(arr);
    }
};

function NewPostion(value, pos) {//lưu vị trí mới sau khi xoay
    if (bool) {
        for (var i = 0; i < NodeArray1.length; i++) {
            if (NodeArray1[i][0] == value) {
                NodeArray1[i][2] = pos;
                return;
            }
        }
    }
    else {
        for (var i = 0; i < NodeArray.length; i++) {
            if (NodeArray[i][0] == value) {
                NodeArray[i][2] = pos;
                return;
            }
        }
    }

};

function Pos(pos) {
    for (var i = 0; i < NodeArray.length; i++) {
        if (NodeArray[i][2] == pos) {
            return i;
        }
    }
    return null;
};

function Line() { // vẽ các đường xoay
    for (var i = 0; i < NodeArray.length; i++) {
        for (var j = 0; j < NodeArray.length; j++) {
            if (NodeArray[i][2] % 2 == 0) {
                if (NodeArray[j][2] == NodeArray[i][2] / 2) {
                    line_toLeft(arr_X[NodeArray[j][1]] + NodeArray[j][3], arr_Y[NodeArray[j][1]] + NodeArray[j][4]
                        , arr_X[NodeArray[i][1]] + NodeArray[i][3], arr_Y[NodeArray[i][1]] + NodeArray[i][4]);
                }
            }
            else {
                if (NodeArray[j][2] == (NodeArray[i][2] - 1) / 2) {
                    line_toRight(arr_X[NodeArray[j][1]] + NodeArray[j][3], arr_Y[NodeArray[j][1]] + NodeArray[j][4]
                        , arr_X[NodeArray[i][1]] + NodeArray[i][3], arr_Y[NodeArray[i][1]] + NodeArray[i][4]);
                }
            }
        }
    }
};

function update() {//cập nhật vị trí x, y
    for (var i = 0; i < NodeArray.length; i++) {
        if (arr_X[NodeArray[i][1]] < arr_X[NodeArray[i][2]]) {
            if (arr_X[NodeArray[i][1]] + NodeArray[i][3] <= arr_X[NodeArray[i][2]])
                NodeArray[i][3] += document.getElementById("flying").value / 10;
        }
        else {
            if (arr_X[NodeArray[i][1]] + NodeArray[i][3] >= arr_X[NodeArray[i][2]])
                NodeArray[i][3] -= document.getElementById("flying").value / 10;
        }
        if (arr_Y[NodeArray[i][1]] < arr_Y[NodeArray[i][2]]) {
            if (arr_Y[NodeArray[i][1]] + NodeArray[i][4] <= arr_Y[NodeArray[i][2]])
                NodeArray[i][4] += document.getElementById("flying").value / 10;
        }
        else {
            if (arr_Y[NodeArray[i][1]] + NodeArray[i][4] >= arr_Y[NodeArray[i][2]])
                NodeArray[i][4] -= document.getElementById("flying").value / 10;
        }
    }
};

function CHECK() {
    for (var i = 0; i < NodeArray.length; i++) {
        if (arr_X[NodeArray[i][1]] < arr_X[NodeArray[i][2]]) {
            if (arr_X[NodeArray[i][1]] + NodeArray[i][3] < arr_X[NodeArray[i][2]])
                return false;
        }
        else {
            if (arr_X[NodeArray[i][1]] + NodeArray[i][3] > arr_X[NodeArray[i][2]])
                return false;
        }
        if (arr_Y[NodeArray[i][1]] < arr_Y[NodeArray[i][2]]) {
            if (arr_Y[NodeArray[i][1]] + NodeArray[i][4] < arr_Y[NodeArray[i][2]])
                return false;
        }
        else {
            if (arr_Y[NodeArray[i][1]] + NodeArray[i][4] > arr_Y[NodeArray[i][2]])
                return false;
        }
    }
    return true;
};

function equal() {
    for (var i = 0; i < NodeArray1.length; i++) {
        New(NodeArray1[i][0], NodeArray1[i][1]);
        NewPostion(NodeArray1[i][0], NodeArray1[i][2]);
    }
    NodeArray1 = [];
};


function Anim(TheValue, x, y) {//chèn animation
    // xóa
    White();
    //vẽ
    t.Print(TheValue);
    circle(x, y, TheValue);

    if (NewValueDir == 1) {
        line_toRight(arr_X[(NewValueNumber - 1) / 2], arr_Y[(NewValueNumber - 1) / 2], x, y);
    } else if (NewValueDir == 2) {
        line_toLeft(arr_X[NewValueNumber / 2], arr_Y[NewValueNumber / 2], x, y);
    }

    // cập nhật
    if (x <= arr_X[NewValueNumber])
        x += document.getElementById("flying").value / 10;
    if (y <= arr_Y[NewValueNumber])
        y += document.getElementById("flying").value / 10;
    // Animate
    var timer = setTimeout('Anim(' + TheValue + ',' + x + ',' + y + ')', 100 - document.getElementById("flying").value);
    if (x >= arr_X[NewValueNumber] && y >= arr_Y[NewValueNumber]) {
        clearTimeout(timer);
        // xóa
        White();
        //vẽ
        t.Print(null);
        
        if (!check) {
            setTimeout('t.Balance(' + TheValue + ')', 300);
            check = true;
        }
        else { check = false;
        	setTimeout('t.Balance(' + TheValue + ')', 300);
        	}
    }
};

function rotateAnim(Double) {

    // xóa
    White();
    // vẽ
    t.RotatePrint();
	//vẽ vòng tròn
    for (var i = 0; i < NodeArray.length; i++) {
        circle(arr_X[NodeArray[i][1]] + NodeArray[i][3], arr_Y[NodeArray[i][1]] + NodeArray[i][4], NodeArray[i][0]);
    }
    //vẽ đường
    Line();
    if (Double) {
        if (NodeArray[NodeArray.length-1][1] != 1) {
            if (NodeArray[NodeArray.length - 1][1] % 2 == 0) {
                var index = Pos(NodeArray[NodeArray.length - 1][1])
                if (index != null) {
                    line_toLeft(arr_X[NodeArray[NodeArray.length - 1][1] / 2], arr_Y[NodeArray[NodeArray.length - 1][1] / 2],
                        arr_X[NodeArray[index][1]] + NodeArray[index][3], arr_Y[NodeArray[index][1]] + NodeArray[index][4]);
                }
            }
            else {
                var index = Pos(NodeArray[NodeArray.length - 1][1])
                if (index != null) {
                    line_toRight(arr_X[(NodeArray[NodeArray.length - 1][1] - 1) / 2], arr_Y[(NodeArray[NodeArray.length - 1][1] - 1) / 2],
                        arr_X[NodeArray[index][1]] + NodeArray[index][3], arr_Y[NodeArray[index][1]] + NodeArray[index][4]);
                }
            }
        }

    }

    else if (NodeArray[0][1] != 1) {
        if (NodeArray[0][1] % 2 == 0) {
            var index = Pos(NodeArray[0][1])
            if (index != null) {
                line_toLeft(arr_X[NodeArray[0][1] / 2], arr_Y[NodeArray[0][1] / 2],
                    arr_X[NodeArray[index][1]] + NodeArray[index][3], arr_Y[NodeArray[index][1]] + NodeArray[index][4]);
            }
        }
        else {
            var index = Pos(NodeArray[0][1])
            if (index != null) {
                line_toRight(arr_X[(NodeArray[0][1] - 1) / 2], arr_Y[(NodeArray[0][1] - 1) / 2],
                    arr_X[NodeArray[index][1]] + NodeArray[index][3], arr_Y[NodeArray[index][1]] + NodeArray[index][4]);
            }
        }
    }

    //cập nhật
    update();

    // hiệu ứng
    var timer = setTimeout('rotateAnim(' + Double + ')', 100 - document.getElementById("flying").value);
    if (CHECK()) {
        // xóa
        White();
        // vẽ
        clearTimeout(timer);
        if (!Double) {
            t.Print(null);
            NodeArray = [];
            DisAble(false);
        }
        else {
            t.RotatePrint();
            NodeArray = [];
            equal();
            rotateAnim(false);
        }

    }
};

function DisplaySearch(index, x) {
	if (SearchMap.length != 0) {
		if (index == 0) {
			Search_Animation = SearchMap[0][0];
			Node_coordeinat(SearchMap[0][0], Root_height + 1, 0, SearchMap[0][1], null);
		} else {
			Search_Animation = SearchMap[index][0];
			Node_coordeinat(SearchMap[index][0], Root_height + 1, 0, SearchMap[index][1], null);
			Node_coordeinat(SearchMap[index - 1][0], Root_height + 1, 0, SearchMap[index - 1][1], null);
		}
		index += 1
		var timer = setTimeout('DisplaySearch(' + index + ',' + x + ')', 500);
	}
	if (index == SearchMap.length) {
		var s = document.getElementById("value");
		s = Number(s.value);
		clearTimeout(timer);
		if (x != null) {
			textarea.value = s + " was Found. 😊";
		} else {
			textarea.value = s + " was Not Found. 😥";
		}
		Search_Animation = 0;
		setTimeout('t.Print(' + null + ')', 1000);
		SearchMap = [];
		DisAble(false);
	}
};

function DisplayTraversal(index) {
	if (SearchMap.length != 0) {
		if (index == 0) {
			Search_Animation = SearchMap[0][0];
			Node_coordeinat(SearchMap[0][0], Root_height + 1, 0, SearchMap[0][1], null);
		} else {
			Search_Animation = SearchMap[index][0];
			Node_coordeinat(SearchMap[index][0], Root_height + 1, 0, SearchMap[index][1], null);
			Node_coordeinat(SearchMap[index - 1][0], Root_height + 1, 0, SearchMap[index - 1][1], null);
		}
		textarea.value += SearchMap[index][1] + " ";
		index += 1;
		var timer = setTimeout('DisplayTraversal(' + index + ')', 500);
	}
	if (index == SearchMap.length) {
		clearTimeout(timer);
		Search_Animation = 0;
		setTimeout('t.Print(' + null + ')', 1000);
		SearchMap = [];
		DisAble(false);
	}
};

function DisplayInsert(index, value) {
	if (SearchMap.length != 0) {
		if (index == 0) {
			Search_Animation = SearchMap[0][0];
			Node_coordeinat(SearchMap[0][0], Root_height + 1, 0, SearchMap[0][1], null);
		} else {
			Search_Animation = SearchMap[index][0];
			Node_coordeinat(SearchMap[index][0], Root_height + 1, 0, SearchMap[index][1], null);
			Node_coordeinat(SearchMap[index - 1][0], Root_height + 1, 0, SearchMap[index - 1][1], null);
		}
		index += 1;
		var timer = setTimeout('DisplayInsert(' + index + ',' + value + ')', 500);
	}

	if (index == SearchMap.length) {
		clearTimeout(timer);
		Search_Animation = 0;
		setTimeout('Anim(' + value + ',' + 30 + ',' + 30 + ')', 1000);
		SearchMap = [];
	}
};

function DisplayDelete(index) {
	if (SearchMap.length != 0) {
		if (index == 0) {
			Search_Animation = SearchMap[0][0];
			Node_coordeinat(SearchMap[0][0], Root_height + 1, 0, SearchMap[0][1], null);
		} else {
			Search_Animation = SearchMap[index][0];
			Node_coordeinat(SearchMap[index][0], Root_height + 1, 0, SearchMap[index][1], null);
			Node_coordeinat(SearchMap[index - 1][0], Root_height + 1, 0, SearchMap[index - 1][1], null);
		}
		index += 1;
		var timer = setTimeout('DisplayDelete(' + index + ')', 500);
	}
	if (index == SearchMap.length) {
		clearTimeout(timer);
		Search_Animation = 0;
		setTimeout('White()', 1000);
		setTimeout('t.Print(' + null + ')', 1000);
		SearchMap = [];
		DisAble(false);
	}
};

function DisplayFound(index, value) {
	if (SearchMap.length != 0) {
		if (index == 0) {
			Search_Animation = SearchMap[0][0];
			Node_coordeinat(SearchMap[0][0], Root_height + 1, 0, SearchMap[0][1], null);
		} else {
			Search_Animation = SearchMap[index][0];
			Node_coordeinat(SearchMap[index][0], Root_height + 1, 0, SearchMap[index][1], null);
			Node_coordeinat(SearchMap[index - 1][0], Root_height + 1, 0, SearchMap[index - 1][1], null);
		}
		index += 1;
		var timer = setTimeout('DisplayFound(' + index + ',' + value + ')', 500);
	}

	if (index == SearchMap.length) {
		clearTimeout(timer);
		textarea.value = value + " is exist before. 😑";
		Search_Animation = 0;
		setTimeout('t.Print(' + null + ')', 500);
		SearchMap = [];
	}
};
///////////////////////////////////////////////////////////
// undo --> bug
// var root = null;
// var count = 0;
// var rootTopPosition = 80;

// var undo = document.getElementById('undo');
// undo.onclick = function(){
// 	callDeleteUndo();
// }
// var checkUndo = false;
// function callDeleteUndo(){
// 	if(checkUndo == false){
// 		root=DisplayDelete(parseInt(count),root);
// 		setTimeout(function(){
// 			mainColor(root);
// 			Reallocate(root,window.innerWidth/2, rootTopPosition);
// 			var temp = mostLeft(root);
// 			if(parseInt(temp.node.left)<0){
// 				setPosition(root, -1*parseInt(temp.node.left));
// 			}
// 		}, time);
// 		checkUndo = true;
// 		textarea.value = " Undone";

// 	}else{
// 		arlet("Oh sorry, you can't undo 2 times")
// 	}
// }

// function mainColor(value){
// 	if(!value)
// 		return;
// 		value.node.backgroundColor = "red";
// 		mainColor(value.left);
// 		mainColor(value.right);
// }

// function Reallocate(node, x, y){
// 	if(!node)
// 		return;
// 	var temp = (Math.pow(2, node.h-1) ) * 50;
// 	if(node.linel){
// 		document.body.removeChild(node.linel);
// 		node.linel = null;
// 	}
// 	if(node.liner){
// 		document.body.removeChild(node.liner);
// 		node.liner = null;
// 	}
// 	if(node.left){
// 		node.linel = Line();
// 	}
// 	if(node.right){
// 		node.liner = Line();
// 	}
// 	node.node.left = x + 'px';
// 	node.node.top = y + 'px';
// 	Reallocate(node.left, x-temp, y+100);
// 	Reallocate(node.right, x-temp, y+100);
// }
// function mostLeft(node){
// 	var cur = node;
// 	while(cur.left)
// 	{
// 		cur = cur.left;
// 	}
// 	return cur;
// }
// function setPosition(node, shifting){
// 	if(!node)
// 	{
// 		return;
// 	}
// 	setPosition(node.left, shifting);
// 	setPosition(node.right, shifting);
// 	node.node.left = parseInt(node.node.left) + shifting + 'px';
// 	if(node.linel){
// 		node.linel.style.left = parseInt(node.linel.style.left) + shifting + 'px';
// 	}
// 	if(node.liner){
// 		node.liner.style.left = parseInt(node.liner.style.left) + shifting + 'px';
// 	}
// }