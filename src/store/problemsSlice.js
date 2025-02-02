import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    problemList: [
        {
            problemName: 'problem1',
            problemDifficulty: 'Medium',
            problemUrl: 'www.google.com',
            problemTags: ['Array', 'Heap', 'Hashmap'],
            problemNotes: 'As the sun dipped below the horizon, the golden light bathed the landscape in a warm, peaceful glow, and the breeze whispered through the trees. People gathered along the shoreline, watching the waves gently lap against the sand, their minds at ease, appreciating the beauty of the moment, lost in the tranquility of natures embrace.gently lap against the sand, their minds at ease, appreciating the beauty of the moment, lost in the tranquility of natures embrace.'
        },
        {
            problemName: 'problem2',
            problemDifficulty: 'Hard',
            problemUrl: 'www.youtube.com',
            problemTags: ['Array', 'Heap', 'Hashmap'],
            problemNotes: 'As the sun dipped below the horizon, the golden light bathed the landscape in a warm, peaceful glow, and the breeze whispered through the trees.',
            revisionFlag: true,
        },
        {
            problemName: 'problem3',
            problemDifficulty: 'Hard',
            problemUrl: 'www.facebook.com',
            problemTags: ['Array', 'Heap', 'Hashmap'],
            problemNotes: 'As the sun dipped below the horizon, the golden light bathed the landscape in a warm, peaceful glow, and the breeze whispered through the trees. As the sun dipped below the horizon, the golden light bathed the landscape in a warm, peaceful glow, and the breeze whispered through the trees. As the sun dipped below the horizon, the golden light bathed the landscape in a warm, peaceful glow, and the breeze whispered through the trees.'
        },
        {
            problemName: 'problem4',
            problemDifficulty: 'Hard',
            problemUrl: 'www.OUTLOOK.com',
            problemTags: ['Array', 'Heap', 'Hashmap', 'Binary Search'],
            problemNotes: 'As the sun dipped below the horizon, the golden light bathed the landscape in a warm, peaceful glow, and the breeze whispered through the trees. As the sun dipped below the horizon, the golden light bathed the landscape in a warm, peaceful glow, and the breeze whispered through the trees. As the sun dipped below the horizon, the golden light bathed the landscape in a warm, peaceful glow, and the breeze whispered through the trees.'
        }
    ],
    problemCount: 0
}

const problemsSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        setProblems: (state, action) => {
            state.problemList = action.payload.problemList;
            state.problemCount = action.payload.problemCount;
        }
    }
});

export const { setProblems } = problemsSlice.actions;

export default problemsSlice.reducer;