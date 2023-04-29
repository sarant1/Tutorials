import numpy as np

# Element wide maths

a = np.array([1, 2, 3, 4])

print("a + 2: ", a + 2)
print("a - 2: ", a - 2)


b = np.array([1, 0, 1, 0])
print("a + b: ", a + b)
print("a * b: ", a * b)


# Linear Algebra

c = np.ones((2, 3))
d = np.full((3, 2), 2)
print(a)
print("c: \n", c)
print("d: \n", d)

e = np.matmul(c, d)
print("e: \n", e)

# Find the determinant
g = np.identity(3)
np.linalg.det(g)
print(g)


# Statistics

stats = np.array([[1, 2, 3], [4, 5, 6]])
print("min: ",np.min(stats))
print("max: ",np.max(stats, axis=1))
print("sum: ",np.sum(stats, axis=0))
