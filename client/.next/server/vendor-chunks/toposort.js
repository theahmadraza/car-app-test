/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/toposort";
exports.ids = ["vendor-chunks/toposort"];
exports.modules = {

/***/ "(ssr)/./node_modules/toposort/index.js":
/*!****************************************!*\
  !*** ./node_modules/toposort/index.js ***!
  \****************************************/
/***/ ((module) => {

eval("\n/**\n * Topological sorting function\n *\n * @param {Array} edges\n * @returns {Array}\n */\n\nmodule.exports = function(edges) {\n  return toposort(uniqueNodes(edges), edges)\n}\n\nmodule.exports.array = toposort\n\nfunction toposort(nodes, edges) {\n  var cursor = nodes.length\n    , sorted = new Array(cursor)\n    , visited = {}\n    , i = cursor\n    // Better data structures make algorithm much faster.\n    , outgoingEdges = makeOutgoingEdges(edges)\n    , nodesHash = makeNodesHash(nodes)\n\n  // check for unknown nodes\n  edges.forEach(function(edge) {\n    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {\n      throw new Error('Unknown node. There is an unknown node in the supplied edges.')\n    }\n  })\n\n  while (i--) {\n    if (!visited[i]) visit(nodes[i], i, new Set())\n  }\n\n  return sorted\n\n  function visit(node, i, predecessors) {\n    if(predecessors.has(node)) {\n      var nodeRep\n      try {\n        nodeRep = \", node was:\" + JSON.stringify(node)\n      } catch(e) {\n        nodeRep = \"\"\n      }\n      throw new Error('Cyclic dependency' + nodeRep)\n    }\n\n    if (!nodesHash.has(node)) {\n      throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: '+JSON.stringify(node))\n    }\n\n    if (visited[i]) return;\n    visited[i] = true\n\n    var outgoing = outgoingEdges.get(node) || new Set()\n    outgoing = Array.from(outgoing)\n\n    if (i = outgoing.length) {\n      predecessors.add(node)\n      do {\n        var child = outgoing[--i]\n        visit(child, nodesHash.get(child), predecessors)\n      } while (i)\n      predecessors.delete(node)\n    }\n\n    sorted[--cursor] = node\n  }\n}\n\nfunction uniqueNodes(arr){\n  var res = new Set()\n  for (var i = 0, len = arr.length; i < len; i++) {\n    var edge = arr[i]\n    res.add(edge[0])\n    res.add(edge[1])\n  }\n  return Array.from(res)\n}\n\nfunction makeOutgoingEdges(arr){\n  var edges = new Map()\n  for (var i = 0, len = arr.length; i < len; i++) {\n    var edge = arr[i]\n    if (!edges.has(edge[0])) edges.set(edge[0], new Set())\n    if (!edges.has(edge[1])) edges.set(edge[1], new Set())\n    edges.get(edge[0]).add(edge[1])\n  }\n  return edges\n}\n\nfunction makeNodesHash(arr){\n  var res = new Map()\n  for (var i = 0, len = arr.length; i < len; i++) {\n    res.set(arr[i], i)\n  }\n  return res\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdG9wb3NvcnQvaW5kZXguanMiLCJtYXBwaW5ncyI6IjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC1hcHAvLi9ub2RlX21vZHVsZXMvdG9wb3NvcnQvaW5kZXguanM/ZGNjMyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogVG9wb2xvZ2ljYWwgc29ydGluZyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGVkZ2VzXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlZGdlcykge1xuICByZXR1cm4gdG9wb3NvcnQodW5pcXVlTm9kZXMoZWRnZXMpLCBlZGdlcylcbn1cblxubW9kdWxlLmV4cG9ydHMuYXJyYXkgPSB0b3Bvc29ydFxuXG5mdW5jdGlvbiB0b3Bvc29ydChub2RlcywgZWRnZXMpIHtcbiAgdmFyIGN1cnNvciA9IG5vZGVzLmxlbmd0aFxuICAgICwgc29ydGVkID0gbmV3IEFycmF5KGN1cnNvcilcbiAgICAsIHZpc2l0ZWQgPSB7fVxuICAgICwgaSA9IGN1cnNvclxuICAgIC8vIEJldHRlciBkYXRhIHN0cnVjdHVyZXMgbWFrZSBhbGdvcml0aG0gbXVjaCBmYXN0ZXIuXG4gICAgLCBvdXRnb2luZ0VkZ2VzID0gbWFrZU91dGdvaW5nRWRnZXMoZWRnZXMpXG4gICAgLCBub2Rlc0hhc2ggPSBtYWtlTm9kZXNIYXNoKG5vZGVzKVxuXG4gIC8vIGNoZWNrIGZvciB1bmtub3duIG5vZGVzXG4gIGVkZ2VzLmZvckVhY2goZnVuY3Rpb24oZWRnZSkge1xuICAgIGlmICghbm9kZXNIYXNoLmhhcyhlZGdlWzBdKSB8fCAhbm9kZXNIYXNoLmhhcyhlZGdlWzFdKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG5vZGUuIFRoZXJlIGlzIGFuIHVua25vd24gbm9kZSBpbiB0aGUgc3VwcGxpZWQgZWRnZXMuJylcbiAgICB9XG4gIH0pXG5cbiAgd2hpbGUgKGktLSkge1xuICAgIGlmICghdmlzaXRlZFtpXSkgdmlzaXQobm9kZXNbaV0sIGksIG5ldyBTZXQoKSlcbiAgfVxuXG4gIHJldHVybiBzb3J0ZWRcblxuICBmdW5jdGlvbiB2aXNpdChub2RlLCBpLCBwcmVkZWNlc3NvcnMpIHtcbiAgICBpZihwcmVkZWNlc3NvcnMuaGFzKG5vZGUpKSB7XG4gICAgICB2YXIgbm9kZVJlcFxuICAgICAgdHJ5IHtcbiAgICAgICAgbm9kZVJlcCA9IFwiLCBub2RlIHdhczpcIiArIEpTT04uc3RyaW5naWZ5KG5vZGUpXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbm9kZVJlcCA9IFwiXCJcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignQ3ljbGljIGRlcGVuZGVuY3knICsgbm9kZVJlcClcbiAgICB9XG5cbiAgICBpZiAoIW5vZGVzSGFzaC5oYXMobm9kZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdW5rbm93biBub2RlLiBNYWtlIHN1cmUgdG8gcHJvdmlkZWQgYWxsIGludm9sdmVkIG5vZGVzLiBVbmtub3duIG5vZGU6ICcrSlNPTi5zdHJpbmdpZnkobm9kZSkpXG4gICAgfVxuXG4gICAgaWYgKHZpc2l0ZWRbaV0pIHJldHVybjtcbiAgICB2aXNpdGVkW2ldID0gdHJ1ZVxuXG4gICAgdmFyIG91dGdvaW5nID0gb3V0Z29pbmdFZGdlcy5nZXQobm9kZSkgfHwgbmV3IFNldCgpXG4gICAgb3V0Z29pbmcgPSBBcnJheS5mcm9tKG91dGdvaW5nKVxuXG4gICAgaWYgKGkgPSBvdXRnb2luZy5sZW5ndGgpIHtcbiAgICAgIHByZWRlY2Vzc29ycy5hZGQobm9kZSlcbiAgICAgIGRvIHtcbiAgICAgICAgdmFyIGNoaWxkID0gb3V0Z29pbmdbLS1pXVxuICAgICAgICB2aXNpdChjaGlsZCwgbm9kZXNIYXNoLmdldChjaGlsZCksIHByZWRlY2Vzc29ycylcbiAgICAgIH0gd2hpbGUgKGkpXG4gICAgICBwcmVkZWNlc3NvcnMuZGVsZXRlKG5vZGUpXG4gICAgfVxuXG4gICAgc29ydGVkWy0tY3Vyc29yXSA9IG5vZGVcbiAgfVxufVxuXG5mdW5jdGlvbiB1bmlxdWVOb2RlcyhhcnIpe1xuICB2YXIgcmVzID0gbmV3IFNldCgpXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgZWRnZSA9IGFycltpXVxuICAgIHJlcy5hZGQoZWRnZVswXSlcbiAgICByZXMuYWRkKGVkZ2VbMV0pXG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20ocmVzKVxufVxuXG5mdW5jdGlvbiBtYWtlT3V0Z29pbmdFZGdlcyhhcnIpe1xuICB2YXIgZWRnZXMgPSBuZXcgTWFwKClcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBlZGdlID0gYXJyW2ldXG4gICAgaWYgKCFlZGdlcy5oYXMoZWRnZVswXSkpIGVkZ2VzLnNldChlZGdlWzBdLCBuZXcgU2V0KCkpXG4gICAgaWYgKCFlZGdlcy5oYXMoZWRnZVsxXSkpIGVkZ2VzLnNldChlZGdlWzFdLCBuZXcgU2V0KCkpXG4gICAgZWRnZXMuZ2V0KGVkZ2VbMF0pLmFkZChlZGdlWzFdKVxuICB9XG4gIHJldHVybiBlZGdlc1xufVxuXG5mdW5jdGlvbiBtYWtlTm9kZXNIYXNoKGFycil7XG4gIHZhciByZXMgPSBuZXcgTWFwKClcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHJlcy5zZXQoYXJyW2ldLCBpKVxuICB9XG4gIHJldHVybiByZXNcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/toposort/index.js\n");

/***/ })

};
;