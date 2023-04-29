import numpy as np

before = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])
print("before: \n", before)

after = before.reshape((2, 2, 2))
print("after: \n", after)


# Vertically Stacking matrixes

v1 = np.array([1, 2, 3, 4])
v2 = np.array([5, 6, 7, 8])

v3 = np.vstack([v1, v2, v2, before])
print("v3: \n", v3)


# Horizontal Stack

h1 = np.ones((2, 4))
h2 = np.zeros((2, 5))

h3 = np.hstack((h1, h2))
print("h3: \n", h3)