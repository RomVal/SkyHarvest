/**
 * Enum for default city configurations.
 * @enum {string}
 */
export const CITY = {
  stockholm: 'stockholm',
  berlin: 'berlin',
  copenhagen: 'copenhagen',
  amsterdam: 'amsterdam',
  athens: 'athens',
  london: 'london',
  lisbon: 'lisbon',
  paris: 'paris',
  zurich: 'zurich',
  vancouver: 'vancouver',
  delhi: 'delhi',
  los_angeles: 'los-angeles',
  oslo: 'oslo',
  singapore: 'singapore',
  beijing: 'beijing',
  salzburg: 'salzburg',
  vienna: 'vienna',
  poznan: 'poznan',
  warsaw: 'warsaw',
  sydney: 'sydney',
  tokyo: 'tokyo',
  lviv: 'lviv',
  kyiv: 'kyiv',
  dubai: 'dubai',
  prague: 'prague',
  brno: 'brno',
  stuttgart: 'stuttgart',
  mexico: 'mexico',
};

export const cities = [
  {
    name: CITY.stockholm,
    traffic: [
      {
        origin: {
          lat: 59.345671,
          lng: 18.062551,
        },
        destination: { lat: 59.331934, lng: 18.09282 },
      },
      {
        origin: {
          lat: 59.317953,
          lng: 18.032754,
        },
        destination: { lat: 59.307661, lng: 18.073588 },
      },
      {
        origin: {
          lat: 59.336193,
          lng: 18.072449,
        },
        destination: { lat: 59.349872, lng: 18.098057 },
      },
    ],
  },
  {
    name: CITY.berlin,
    traffic: [
      {
        origin: {
          lat: 52.507003,
          lng: 13.398356,
        },
        destination: { lat: 52.487934, lng: 13.424844 },
      },
      {
        origin: {
          lat: 52.493049,
          lng: 13.387089,
        },
        destination: { lat: 52.489006, lng: 13.345299 },
      },
      {
        origin: {
          lat: 52.52871,
          lng: 13.409443,
        },
        destination: { lat: 52.555765, lng: 13.38417 },
      },
    ],
  },
  {
    name: CITY.copenhagen,
    traffic: [
      {
        origin: {
          lat: 55.667443,
          lng: 12.587584,
        },
        destination: { lat: 55.653192, lng: 12.615555 },
      },
      {
        origin: {
          lat: 55.692454,
          lng: 12.586391,
        },
        destination: { lat: 55.713142, lng: 12.57283 },
      },
      {
        origin: {
          lat: 55.70489,
          lng: 12.545366,
        },
        destination: { lat: 55.693707, lng: 12.566266 },
      },
    ],
  },
  {
    name: CITY.vancouver,
    traffic: [
      {
        origin: {
          lat: 49.257787,
          lng: -123.178282,
        },
        destination: { lat: 49.218477, lng: -123.091372 },
      },
      {
        origin: {
          lat: 49.160478,
          lng: -122.921903,
        },
        destination: { lat: 49.184127, lng: -122.778185 },
      },
      {
        origin: {
          lat: 49.308634,
          lng: -123.057126,
        },
        destination: { lat: 49.336643, lng: -123.071824 },
      },
    ],
  },
  {
    name: CITY.zurich,
    traffic: [
      {
        origin: {
          lat: 47.366817,
          lng: 8.553663,
        },
        destination: { lat: 47.373473, lng: 8.561517 },
      },
      {
        origin: {
          lat: 47.377005,
          lng: 8.559603,
        },
        destination: { lat: 47.386083, lng: 8.545592 },
      },
      {
        origin: {
          lat: 47.364628,
          lng: 8.536844,
        },
        destination: { lat: 47.376911, lng: 8.528683 },
      },
    ],
  },
  {
    name: CITY.oslo,
    traffic: [
      {
        origin: {
          lat: 59.90794,
          lng: 10.741688,
        },
        destination: { lat: 59.916398, lng: 10.782254 },
      },
      {
        origin: {
          lat: 59.914713,
          lng: 10.717672,
        },
        destination: { lat: 59.927963, lng: 10.749416 },
      },
      {
        origin: {
          lat: 59.943457,
          lng: 10.698168,
        },
        destination: { lat: 59.951747, lng: 10.674418 },
      },
    ],
  },
  {
    name: CITY.singapore,
    traffic: [
      {
        origin: {
          lat: 1.288179,
          lng: 103.805124,
        },
        destination: { lat: 1.309202, lng: 103.83366 },
      },
      {
        origin: {
          lat: 1.29966,
          lng: 103.785544,
        },
        destination: { lat: 1.326672, lng: 103.800046 },
      },
      {
        origin: {
          lat: 1.309513,
          lng: 103.8945,
        },
        destination: { lat: 1.335203, lng: 103.94362 },
      },
    ],
  },
  {
    name: CITY.beijing,
    traffic: [
      {
        origin: {
          lat: 39.884712,
          lng: 116.321045,
        },
        destination: { lat: 39.839948, lng: 116.386435 },
      },
      {
        origin: {
          lat: 39.831795,
          lng: 116.447995,
        },
        destination: { lat: 39.77362, lng: 116.571368 },
      },
      {
        origin: {
          lat: 39.993539,
          lng: 116.352321,
        },
        destination: { lat: 40.08373, lng: 116.357936 },
      },
    ],
  },
  {
    name: CITY.los_angeles,
    traffic: [
      {
        origin: {
          lat: 33.808589,
          lng: -118.275403,
        },
        destination: { lat: 33.876808, lng: -118.143821 },
      },
      {
        origin: {
          lat: 33.946153,
          lng: -118.264987,
        },
        destination: { lat: 34.02532, lng: -118.317144 },
      },
      {
        origin: {
          lat: 34.061782,
          lng: -118.309236,
        },
        destination: { lat: 34.040263, lng: -118.428997 },
      },
    ],
  },
  {
    name: CITY.delhi,
    traffic: [
      {
        origin: {
          lat: 28.654014,
          lng: 77.216266,
        },
        destination: { lat: 28.658414, lng: 77.182529 },
      },
      {
        origin: {
          lat: 28.590663,
          lng: 77.223873,
        },
        destination: { lat: 28.540451, lng: 77.227311 },
      },
      {
        origin: {
          lat: 28.708762,
          lng: 77.167016,
        },
        destination: { lat: 28.72256, lng: 77.11034 },
      },
    ],
  },
  {
    name: CITY.mexico,
    traffic: [
      {
        origin: {
          lat: 19.424701,
          lng: -99.142672,
        },
        destination: { lat: 19.398496, lng: -99.113699 },
      },
      {
        origin: {
          lat: 19.312645,
          lng: -99.170533,
        },
        destination: { lat: 19.398688, lng: -99.113754 },
      },
      {
        origin: {
          lat: 19.443867,
          lng: -99.117393,
        },
        destination: { lat: 19.49001, lng: -99.074775 },
      },
    ],
  },
  {
    name: CITY.stuttgart,
    traffic: [
      {
        origin: {
          lat: 48.760771,
          lng: 9.160004,
        },
        destination: { lat: 48.77976, lng: 9.191186 },
      },
      {
        origin: {
          lat: 48.781184,
          lng: 9.207892,
        },
        destination: { lat: 48.7973, lng: 9.208192 },
      },
      {
        origin: {
          lat: 48.80671,
          lng: 9.211691,
        },
        destination: { lat: 48.825096, lng: 9.211333 },
      },
    ],
  },
  {
    name: CITY.paris,
    traffic: [
      {
        origin: {
          lat: 48.837479,
          lng: 2.373841,
        },
        destination: { lat: 48.843595, lng: 2.324212 },
      },
      {
        origin: {
          lat: 48.848225,
          lng: 2.399121,
        },
        destination: { lat: 48.878294, lng: 2.354199 },
      },
      {
        origin: {
          lat: 48.783402,
          lng: 2.287807,
        },
        destination: { lat: 48.799228, lng: 2.33285 },
      },
    ],
  },
  {
    name: CITY.lisbon,
    traffic: [
      {
        origin: {
          lat: 38.706805,
          lng: -9.157994,
        },
        destination: { lat: 38.741776, lng: -9.133299 },
      },
      {
        origin: {
          lat: 38.760596,
          lng: -9.096053,
        },
        destination: { lat: 38.784786, lng: -9.116143 },
      },
      {
        origin: {
          lat: 38.75448,
          lng: -9.130656,
        },
        destination: { lat: 38.767312, lng: -9.148916 },
      },
    ],
  },
  {
    name: CITY.london,
    traffic: [
      {
        origin: {
          lat: 51.504399,
          lng: -0.095716,
        },
        destination: { lat: 51.473098, lng: -0.052813 },
      },
      {
        origin: {
          lat: 51.473459,
          lng: -0.057784,
        },
        destination: { lat: 51.458952, lng: -0.06609 },
      },
      {
        origin: {
          lat: 51.546339,
          lng: -0.1041,
        },
        destination: { lat: 51.545723, lng: -0.155752 },
      },
    ],
  },
  {
    name: CITY.athens,
    traffic: [
      {
        origin: {
          lat: 37.907249,
          lng: 23.723559,
        },
        destination: { lat: 37.948831, lng: 23.738016 },
      },
      {
        origin: {
          lat: 37.949836,
          lng: 23.647034,
        },
        destination: { lat: 37.976146, lng: 23.676131 },
      },
      {
        origin: {
          lat: 37.990587,
          lng: 23.726756,
        },
        destination: { lat: 38.051756, lng: 23.732017 },
      },
    ],
  },
  {
    name: CITY.amsterdam,
    traffic: [
      {
        origin: {
          lat: 52.365404,
          lng: 4.94821,
        },
        destination: { lat: 52.356085, lng: 4.897676 },
      },
      {
        origin: {
          lat: 52.298718,
          lng: 4.972761,
        },
        destination: { lat: 52.325072, lng: 4.943013 },
      },
      {
        origin: {
          lat: 52.370444,
          lng: 4.864683,
        },
        destination: { lat: 52.349026, lng: 4.804418 },
      },
    ],
  },
  {
    name: CITY.vienna,
    traffic: [
      {
        origin: {
          lat: 48.162127,
          lng: 16.428577,
        },
        destination: { lat: 48.200633, lng: 16.397807 },
      },
      {
        origin: {
          lat: 48.159104,
          lng: 16.366757,
        },
        destination: { lat: 48.181468, lng: 16.379148 },
      },
      {
        origin: {
          lat: 48.201873,
          lng: 16.374218,
        },
        destination: { lat: 48.214517, lng: 16.35637 },
      },
    ],
  },
  {
    name: CITY.salzburg,
    traffic: [
      {
        origin: {
          lat: 47.784778,
          lng: 13.026133,
        },
        destination: { lat: 47.799298, lng: 13.040634 },
      },
      {
        origin: {
          lat: 47.805837,
          lng: 13.027317,
        },
        destination: { lat: 47.824173, lng: 13.038862 },
      },
      {
        origin: {
          lat: 47.801563,
          lng: 13.012032,
        },
        destination: { lat: 47.811289, lng: 13.013473 },
      },
    ],
  },
  {
    name: CITY.warsaw,
    traffic: [
      {
        origin: {
          lat: 52.141133,
          lng: 21.039103,
        },
        destination: { lat: 52.196642, lng: 20.964159 },
      },
      {
        origin: {
          lat: 52.223809,
          lng: 20.990118,
        },
        destination: { lat: 52.236968, lng: 21.033718 },
      },
      {
        origin: {
          lat: 52.254746,
          lng: 21.034749,
        },
        destination: { lat: 52.287279, lng: 21.075404 },
      },
    ],
  },
  {
    name: CITY.poznan,
    traffic: [
      {
        origin: {
          lat: 52.371556,
          lng: 16.87603,
        },
        destination: { lat: 52.399668, lng: 16.905035 },
      },
      {
        origin: {
          lat: 52.420591,
          lng: 16.873193,
        },
        destination: { lat: 52.419358, lng: 16.92256 },
      },
      {
        origin: {
          lat: 52.427375,
          lng: 16.920156,
        },
        destination: { lat: 52.451997, lng: 16.947701 },
      },
    ],
  },
  {
    name: CITY.sydney,
    traffic: [
      {
        origin: {
          lat: -33.885117,
          lng: 151.268327,
        },
        destination: { lat: -33.902877, lng: 151.244586 },
      },
      {
        origin: {
          lat: -33.969792,
          lng: 151.241231,
        },
        destination: { lat: -33.946321, lng: 151.238427 },
      },
      {
        origin: {
          lat: -33.901377,
          lng: 151.222487,
        },
        destination: { lat: -33.876022, lng: 151.183865 },
      },
    ],
  },
  {
    name: CITY.tokyo,
    traffic: [
      {
        origin: {
          lat: 35.663415,
          lng: 139.823511,
        },
        destination: { lat: 35.69178, lng: 139.805721 },
      },
      {
        origin: {
          lat: 35.689251,
          lng: 139.779016,
        },
        destination: { lat: 35.692389, lng: 139.765477 },
      },
      {
        origin: {
          lat: 35.688239,
          lng: 139.744935,
        },
        destination: { lat: 35.700058, lng: 139.720751 },
      },
    ],
  },
  {
    name: CITY.brno,
    traffic: [
      {
        origin: {
          lat: 49.165826,
          lng: 16.616504,
        },
        destination: { lat: 49.183997, lng: 16.626256 },
      },
      {
        origin: {
          lat: 49.203097,
          lng: 16.62802,
        },
        destination: { lat: 49.198335, lng: 16.603691 },
      },
      {
        origin: {
          lat: 49.2077,
          lng: 16.604334,
        },
        destination: { lat: 49.228857, lng: 16.594729 },
      },
    ],
  },
  {
    name: CITY.prague,
    traffic: [
      {
        origin: {
          lat: 50.029421,
          lng: 14.525415,
        },
        destination: { lat: 50.034327, lng: 14.512318 },
      },
      {
        origin: {
          lat: 50.054212,
          lng: 14.48953,
        },
        destination: { lat: 50.090708, lng: 14.46766 },
      },
      {
        origin: {
          lat: 50.11847,
          lng: 14.461285,
        },
        destination: { lat: 50.13085, lng: 14.450409 },
      },
    ],
  },
  {
    name: CITY.dubai,
    traffic: [
      {
        origin: {
          lat: 24.989235,
          lng: 55.087466,
        },
        destination: { lat: 25.079089, lng: 55.178421 },
      },
      {
        origin: {
          lat: 25.112836,
          lng: 55.187933,
        },
        destination: { lat: 25.170977, lng: 55.263526 },
      },
      {
        origin: {
          lat: 25.240827,
          lng: 55.269727,
        },
        destination: { lat: 25.247613, lng: 55.314143 },
      },
    ],
  },
  {
    name: CITY.kyiv,
    traffic: [
      {
        origin: {
          lat: 50.478365,
          lng: 30.617789,
        },
        destination: { lat: 50.439586, lng: 30.610764 },
      },
      {
        origin: {
          lat: 50.403956,
          lng: 30.562688,
        },
        destination: { lat: 50.419133, lng: 30.521742 },
      },
      {
        origin: {
          lat: 50.428295,
          lng: 30.513385,
        },
        destination: { lat: 50.477406, lng: 30.450513 },
      },
    ],
  },
  {
    name: CITY.lviv,
    traffic: [
      {
        origin: {
          lat: 49.810252,
          lng: 24.045855,
        },
        destination: { lat: 49.832292, lng: 24.01796 },
      },
      {
        origin: {
          lat: 49.823854,
          lng: 24.012102,
        },
        destination: { lat: 49.841449, lng: 24.025707 },
      },
      {
        origin: {
          lat: 49.84876,
          lng: 24.015286,
        },
        destination: { lat: 49.870207, lng: 24.042837 },
      },
    ],
  },
];
