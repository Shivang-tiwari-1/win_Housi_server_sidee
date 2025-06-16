const Binarytree = (data) => {
  return {
    value: data?.value,
    index: data?.index,
    left: null,
    right: null,
  };
};

const insertNode = (root, data) => {
  if (root.left === null) {
    root.left = Binarytree(data);
  } else {
    insertNode(root.left, data);
  }
};

exports.insert = (root, data) => {
  if (root === null) {
    return Binarytree(data);
  } else {
    insertNode(root, data);
    return root;
  }
};

let root = null;
root = insert(root, { value: null, index: [0, 0] });
root = insert(root, { value: [0, 0], index: [0, 1] });
root = insert(root, { value: [0, 0], index: [0, 2] });

console.log(JSON.stringify(root, null, 2));
