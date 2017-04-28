var Test = require('./frameworks/javascript/cw-2');

var log = true;
var logJson = false;

function BinaryTree() {};

function BinaryTreeNode(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
    Object.freeze(this);
}

BinaryTreeNode.prototype = new BinaryTree();
BinaryTreeNode.prototype.constructor = BinaryTreeNode;

BinaryTreeNode.prototype.isEmpty = function () {
    return !(this instanceof BinaryTreeNode);
};

BinaryTreeNode.prototype.depth = function () {
    var maxDepth = 0;

    findDepth(this, 0);

    if (log) {
        console.log('var depth = t.depth();');
        console.log(' ');
    }
    if (logJson) {
        console.log('var depthJson = ' + JSON.stringify(this) + '\n;');
        console.log(' ');
    }
    if (logJson) {
        console.log(`//depth = ${maxDepth}`);
        console.log(' ');
    }


    return maxDepth;

    function findDepth(node, currentDepth) {
        if (node instanceof EmptyBinaryTree) {
            if (currentDepth > maxDepth) {
                maxDepth = currentDepth;
            }
            return;
        } else {
            ++currentDepth;
            findDepth(node.left, currentDepth);
            findDepth(node.right, currentDepth);
        }
    }

};
BinaryTreeNode.prototype.count = function () {
    var nodeCount = 0;
    countNodes(this);

    if (log) {
        console.log('var count = t.count();');
        console.log(' ');
    }
    if (logJson) {
        console.log('var countJson = ' + JSON.stringify(this) + '\n;');
        console.log(' ');
    }
    if (logJson) {
        console.log(`//count = ${nodeCount}`);
        console.log(' ');
    }

    return nodeCount;

    function countNodes(node) {
        if (node instanceof BinaryTreeNode) {
            nodeCount++;
            countNodes(node.right);
            countNodes(node.left);
        }
    }
};

BinaryTreeNode.prototype.inorder = function (fn) {
    if (log) console.log('var fn = ' + fn.toString() + ';');

    applyInOrder(this);

    function applyInOrder(node) {
        if (node instanceof BinaryTreeNode) {
            applyInOrder(node.left);
            fn(node.value);
            applyInOrder(node.right);
        }
    }
};

BinaryTreeNode.prototype.preorder = function (fn) {
    applyPreOrder(this);

    function applyPreOrder(node) {
        if (node instanceof BinaryTreeNode) {
            fn(node.value);
            applyPreOrder(node.left);
            applyPreOrder(node.right);
        }
    }
};
BinaryTreeNode.prototype.postorder = function (fn) {
    applyPostOrder(this);

    function applyPostOrder(node) {
        if (node instanceof BinaryTreeNode) {
            applyPostOrder(node.left);
            applyPostOrder(node.right);
            fn(node.value);
        }
    }
};

BinaryTreeNode.prototype.contains = function (x) {
    //x = x / 1;

    var hasValue = false;
    find(this);

    if (log) {
        console.log(`var contains = t.contains('${x}');`);
        console.log(' ');
    }
    if (logJson) {
        console.log('var containsJson = ' + JSON.stringify(this) + '\n;');
        console.log(' ');
    }
    if (logJson) {
        console.log(`//contains = ${hasValue}`);
        console.log(' ');
    }

    return hasValue;

    function find(node) {
        if (node instanceof BinaryTreeNode) {
            if (x == node.value) {
                hasValue = true;
            } else {
                find(node.right);
                find(node.left);
            }
        }
    }
};

/*
    Recusively go down the tree looking for the place to insert the node as a leaf.
    If the value already exists in the tree, then insert the new value in the tree
    just before the existing node with that value.
*/
BinaryTreeNode.prototype.insert = function (x) {
    //var x = x / 1;

    var isInserted = false;

    var ret = insertBuild(this, x);

    if (log) {
        console.log(`t = t.insert('${x}');`);
        console.log(' ');
    }
    if (logJson) {
        console.log('var insertJson = ' + JSON.stringify(this) + '\n;');
        console.log(' ');
    }

    return ret;

    function insertBuild(node, x) {
        if (node instanceof EmptyBinaryTree) {
            if (x) {
                var t = new EmptyBinaryTree();
                isInserted = true;
                return t.insert(x);
            } else {
                return new EmptyBinaryTree();
            }
        }

        if (x === undefined) {
            return new BinaryTreeNode(node.value, insertBuild(node.left), insertBuild(node.right))
        } else if (x == node.value) {
            return new BinaryTreeNode(node.value, insertBuild(node.left, x), node.right);
        } else if (x < node.value) {
            return new BinaryTreeNode(node.value, insertBuild(node.left, x), node.right);
        } else if (x > node.value) {
            return new BinaryTreeNode(node.value, node.left, insertBuild(node.right, x));
        }
    }
};

/*
    Removal of a node from an immutable tree requires both removing the node and rebuilding the 
    tree where we have removed a node.  The nodes not involved in the rebuild will be reused in the 
    new tree.  Here, this is done in several steps.
        1.  Search down the tree looking for the first instance of the value while requesting that
            that the nodes rebuild themselves (if the removal node is in the subtree) and their children 
            for wherever the value to remove is not found.
        2.  Once the value is found, do not rebuild that node (which removes it) and look for the 
            next largest value in the left subtree to replace the removed node and track which node 
            is being used to replace the removed node.  
        3.  Finish building the tree.
        4.  For the found replacement node, re-insert all of its children into the tree (which could
            be expensive if the replacement node is high in the tree).
*/
BinaryTreeNode.prototype.remove = function (x) {
    //x = x / 1;

    if (!this.contains(x)) {
        return this;
    }

    var skipNode = null;
    var tree = removeBuild(this, x);
    var ret = insertSubtree(tree, skipNode);

    if (log) {
        console.log(`var remove = t.remove('${x}');`);
        console.log(' ');
    }
    if (logJson) {
        console.log('var removeJson = ' + JSON.stringify(this) + '\n;');
        console.log(' ');
    }

    return ret;

    function removeBuild(node, x) {
        if (node.value == 7) {
            var x = 1;
        }
        if (node != skipNode) {
            if (node instanceof EmptyBinaryTree) {
                return new EmptyBinaryTree();
            }

            if (x == node.value) {
                if (node.left instanceof BinaryTreeNode) {
                    skipNode = findMaxNode(node.left.value, node.left);

                    if (skipNode != node.left) {
                        return new BinaryTreeNode(skipNode.value, removeBuild(node.left), removeBuild(node.right));
                    } else {
                        return new BinaryTreeNode(skipNode.value, node.left, removeBuild(node.right));
                    }

                } else if (node.right instanceof BinaryTreeNode) {
                    skipNode = findMinNode(node.right.value, node.right);

                    if (skipNode != node.right) {
                        return new BinaryTreeNode(skipNode.value, removeBuild(node.left), removeBuild(node.right));
                    } else {
                        return new BinaryTreeNode(skipNode.value, removeBuild(node.left), node.right);
                    }
                } else {
                    return new EmptyBinaryTree();
                }
            } else if (x < node.value) {
                return new BinaryTreeNode(node.value, removeBuild(node.left, x), node.right);
            } else if (x > node.value) {
                return new BinaryTreeNode(node.value, node.left, removeBuild(node.right, x));
            } else {
                return new BinaryTreeNode(node.value, removeBuild(node.left), removeBuild(node.right));
            }
        } else {
            return new EmptyBinaryTree();
        }
    }

    function findMaxNode(value, node) {
        if (node.right instanceof BinaryTreeNode && node.right.value >= value) {
            return findMaxNode(node.right.value, node.right);
        } else if (node.left instanceof BinaryTreeNode && node.left.value >= value) {
            return findMaxNode(node.left.value, node.left);
        } else {
            return node;
        }
    }

    function findMinNode(value, node) {
        if (node.right instanceof BinaryTreeNode && node.right.value <= value) {
            return findMinNode(node.right.value, node.right);
        } else if (node.left instanceof BinaryTreeNode && node.left.value <= value) {
            return findMinNode(node.left.value, node.left);
        } else {
            return node;
        }
    }

    function insertSubtree(tree, subNode) {
        if (subNode instanceof BinaryTreeNode) {
            if (subNode != skipNode) {
                tree = tree.insert(subNode.value);
            }

            tree = insertSubtree(tree, subNode.left);
            tree = insertSubtree(tree, subNode.right);
        }

        return tree;
    }
};

////////////////////////////////////////////////////////////////////////
function EmptyBinaryTree() {
    //if (log) console.log(`var et = new EmptyBinaryTree();`); 
    Object.freeze(this);
}
EmptyBinaryTree.prototype = new BinaryTree();
EmptyBinaryTree.prototype.constructor = EmptyBinaryTree;

EmptyBinaryTree.prototype.isEmpty = function () {
    return true;
};
EmptyBinaryTree.prototype.depth = function () {
    return 0;
};
EmptyBinaryTree.prototype.count = function () {
    return 0;
};

EmptyBinaryTree.prototype.inorder = function (fn) { /* implement this */ };
EmptyBinaryTree.prototype.preorder = function (fn) { /* implement this */ };
EmptyBinaryTree.prototype.postorder = function (fn) { /* implement this */ };

EmptyBinaryTree.prototype.contains = function (x) {
    return false;
};
EmptyBinaryTree.prototype.insert = function (x) {
    //x = x / 1;

    //if (log) console.log(`et = et.insert(${x});`);
    return new BinaryTreeNode(x, new EmptyBinaryTree(), new EmptyBinaryTree());
};
EmptyBinaryTree.prototype.remove = function (x) {
    return new EmptyBinaryTree();
};


var t, mt, t1, t2, t3, _ref;

/*
mt = new EmptyBinaryTree();
t = mt.insert('8');
t = t.insert('4');
t = t.insert('12');
t = t.insert('14');
t = t.insert('10');
t = t.insert('15');
t = t.insert('13');
t = t.insert('11');
t = t.insert('9');
t = t.insert('2');
t = t.insert('1');
t = t.insert('3');
t = t.insert('6');
t = t.insert('5');
t = t.insert('7');
t = t.insert('0');
t = t.remove('4');
var test = t.contains('4');
*/

mt = new EmptyBinaryTree();
var t = mt.insert('8');
t = t.insert('4');
t = t.insert('12');
t = t.insert('14');
t = t.insert('10');
t = t.insert('15');
t = t.insert('13');
t = t.insert('11');
t = t.insert('9');
t = t.insert('2');
t = t.insert('1');
t = t.insert('3');
t = t.insert('6');
t = t.insert('5');
t = t.insert('7');
t = t.insert('0');
var has = t.contains('8');
t = t.insert('2');
t = t.insert('1');
t = t.insert('3');
t = t.insert('6');
t = t.insert('5');
t = t.insert('7');
t = t.remove('8');
var has = t.contains('6');
t = t.remove('6');
t = t.insert('6');
var count = t.count();
//var fn = function (n) {
//   return ret.push(n);
//};
//var traverse = t.inorder(fn);

var doTraversal = function (tree, traversal) {
    var nodes = [];
    tree[traversal](function (x) {
        return nodes.push(x);
    });
    return nodes.join(',');
};
console.log(doTraversal(mt, 'inorder'));
console.log(doTraversal(t, 'inorder'));



/*    mt = new EmptyBinaryTree;
    t1 = mt.insert('b').insert('c').insert('c').insert('a').insert('d')
    t2 = t1.remove('c');
    t3 = t2.insert('f').insert('e').insert('e');
    var depth1 = mt.depth();
    var depth2 = t1.depth();
    var count1 = mt.count();
    var count2 = t1.count();

    var doTraversal = function(tree, traversal) {
      var nodes = [];
      tree[traversal](function(x) { return nodes.push(x); });
      return nodes.join('');
    };
    console.log(doTraversal(mt, 'inorder'));
    console.log(doTraversal(t1, 'inorder'));
    console.log(doTraversal(t1, 'preorder'));
    console.log(doTraversal(t1, 'postorder'));

    var x = 1;

//------------------------------------------------------------------------

Test.describe("Simple tree operations", function() {
  var mt, t1, t2, t3, _ref;
  
  Test.before(function() {
    mt = new EmptyBinaryTree;
    t1 = mt.insert('b').insert('a').insert('c');
    t2 = t1.remove('a');
    t3 = t1.remove('z');
  });
  
  Test.it("Basic tree counting", function() {
    Test.expect(mt.isEmpty(), "Empty tree isEmpty()");
    Test.expect(!t1.isEmpty(), "Non-empty tree is not isEmpty()");
    Test.expect(mt.depth() === 0, "Empty tree has depth zero.");
    Test.expect(t1.depth() === 2, "Tree [ a, [ b [] [] ] [ c [] [] ] ] depth 2");
    Test.expect(mt.count() === 0, "Empty tree has zero non-empty nodes");
    Test.expect(t1.count() === 3, "Tree a, b, c has three nodes");
  });
  
  Test.it("Simple tests of insert", function() {
    Test.expect(!mt.contains('a'), "Empty tree does not contain 'a'");
    Test.expect(t1.contains('a'), "Tree a, b, c contains 'a'");
    Test.expect(t1.contains('b'), "Tree a, b, c contains 'b'");
    Test.expect(t1.contains('c'), "Tree a, b, c contains 'c'");
  });
  
  Test.it("Simple tests of remove", function() {
    Test.expect(!t2.contains('a'), "Tree a, b, c no longer contains 'a' after remove");
    Test.expect(t2.right === t1.right, "Tree a, b, c with 'a' removed shares 'c'");
    Test.expect(t3 === t1, "Removing an absent item leaves tree untouched.");
  });
  
  Test.it("Traversal", function() {
    var doTraversal = function(tree, traversal) {
      var nodes = [];
      tree[traversal](function(x) { return nodes.push(x); });
      return nodes.join('');
    };
  
    Test.expect(doTraversal(mt, 'inorder') === '', "Traverse empty tree");
    Test.expect(doTraversal(t1, 'inorder') === 'abc', "Traverse inorder");
    Test.expect(doTraversal(t1, 'preorder') === 'bac', "Traverse preorder");
    Test.assertEquals(doTraversal(t1, 'postorder'), 'acb', "Traverse postorder");
  });
});
*/