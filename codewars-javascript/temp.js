var contains = t.contains('6');
var containsJson = {
    "value": 8,
    "left": {
        "value": 4,
        "left": {
            "value": 2,
            "left": {
                "value": 1,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 3,
                "left": {},
                "right": {}
            }
        },
        "right": {
            "value": 6,
            "left": {
                "value": 5,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 7,
                "left": {},
                "right": {}
            }
        }
    },
    "right": {
        "value": 12,
        "left": {
            "value": 10,
            "left": {
                "value": 9,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 11,
                "left": {},
                "right": {}
            }
        },
        "right": {
            "value": 14,
            "left": {
                "value": 13,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 15,
                "left": {},
                "right": {}
            }
        }
    }
}; //contains = true 
var remove = t.remove('6');
var removeJson = {
    "value": 8,
    "left": {
        "value": 4,
        "left": {
            "value": 2,
            "left": {
                "value": 1,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 3,
                "left": {},
                "right": {}
            }
        },
        "right": {
            "value": 5,
            "left": {
                "value": 5,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 7,
                "left": {},
                "right": {}
            }
        }
    },
    "right": {
        "value": 12,
        "left": {
            "value": 10,
            "left": {
                "value": 9,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 11,
                "left": {},
                "right": {}
            }
        },
        "right": {
            "value": 14,
            "left": {
                "value": 13,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 15,
                "left": {},
                "right": {}
            }
        }
    }
};
var insert = t.insert('6');
var insertJson = {
    "value": 8,
    "left": {
        "value": 4,
        "left": {
            "value": 2,
            "left": {
                "value": 1,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 3,
                "left": {},
                "right": {}
            }
        },
        "right": {
            "value": 6,
            "left": {
                "value": 5,
                "left": {},
                "right": {
                    "value": 6,
                    "left": {},
                    "right": {}
                }
            },
            "right": {
                "value": 7,
                "left": {},
                "right": {}
            }
        }
    },
    "right": {
        "value": 12,
        "left": {
            "value": 10,
            "left": {
                "value": 9,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 11,
                "left": {},
                "right": {}
            }
        },
        "right": {
            "value": 14,
            "left": {
                "value": 13,
                "left": {},
                "right": {}
            },
            "right": {
                "value": 15,
                "left": {},
                "right": {}
            }
        }
    }
};