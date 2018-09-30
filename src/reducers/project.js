const initialState = {
  devices: [
    {
      name: "K1",
      devices: [
        {
          name: "K1"
        },
        {
          name: "NC"
        },
        { name: "NO" }
      ]
    },
    {
      name: "F2"
    }
  ]
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default projectReducer;
