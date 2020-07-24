import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';
import initialState from './initialState';


describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA = {
    url: 'http://localhost:3002',
    online: false,
    name: null
  };

  const nodeB = {
    url: 'http://localhost:3003',
    online: false,
    name: null
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodeA, res: {node_name: 'alpha'} };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_NODE_BLOCKS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true,
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_NODE_BLOCKS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { 
      type: ActionTypes.GET_NODE_BLOCKS_SUCCESS, 
      node: nodeA, 
      res: {
        "data": [
          {
            "id": "1",
            "type": "blocks",
            "attributes": {
                "index": 1,
                "timestamp": 1530677153,
                "data": "By reason of these things",
                "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                "hash": "nzl9y9lf4NdSQZCw293n5ICLniP6GnWecWcvAjWKjnc="
            }
          },
        ]
      } 
    };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          loading: false,
          blocks: [
            {
              "id": "1",
              "type": "blocks",
              "attributes": {
                  "index": 1,
                  "timestamp": 1530677153,
                  "data": "By reason of these things",
                  "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                  "hash": "nzl9y9lf4NdSQZCw293n5ICLniP6GnWecWcvAjWKjnc="
              }
            },
          ]
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_NODE_BLOCKS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          loading: false,
          blocks: [
            {
              "id": "1",
              "type": "blocks",
              "attributes": {
                  "index": 1,
                  "timestamp": 1530677153,
                  "data": "By reason of these things",
                  "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                  "hash": "nzl9y9lf4NdSQZCw293n5ICLniP6GnWecWcvAjWKjnc="
              }
            },
          ]
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.GET_NODE_BLOCKS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: false,
          blocks: []
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
