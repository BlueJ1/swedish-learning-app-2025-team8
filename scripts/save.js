// ==============================================
// Owned by the Menu Team
// ==============================================

// Provide functions to be used by other scripts
window.save = {
  get(team_name) {
    const json = localStorage.getItem(team_name);
    return json ? JSON.parse(json) : {}; // return empty object if not set
  },

  set(team_name, data) {
    localStorage.setItem(team_name, JSON.stringify(data));
  },

  clear(team_name) {
    localStorage.removeItem(team_name);
  },
};

/**
 *
 * @param {string} team_name
 * @returns {Object}
 */
export function get(team_name) {
  const json = localStorage.getItem(team_name);
  return json ? JSON.parse(json) : {}; // return empty object if not set
}

/**
 *
 * @param {string} team_name
 * @param {Object} data
 */
export function set(team_name, data) {
  localStorage.setItem(team_name, JSON.stringify(data));
}

/**
 *
 * @param {string} team_name
 */
export function clear(team_name) {
  localStorage.removeItem(team_name);
}
