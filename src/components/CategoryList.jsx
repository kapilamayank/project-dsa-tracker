import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import ProblemList from './ProblemList';

function CategoryList() {
    const [categories, setCategories] = useState(['Array', 'Matrix', 'String', 'Binary Search', 
                        'Hash Table', 'Linked List', 'Stack', 'Queue', 'Binary Tree', 'Binary Search Tree', 
                        'Heap (Priority Queue)', 'Trie', 'Recursion', 'Backtracking', 'Graph', 'Dynamic Programming', 'Math', 
                        'Bit Manipulation', 'Union Find']);

    return (
    <div>
        { categories.map((category) => (<ProblemList key={category} category={category} />))}
    </div>
  )
}

export default CategoryList