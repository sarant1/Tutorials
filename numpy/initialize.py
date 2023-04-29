import numpy as np
# Iniitialize different types of arrays

# All 0s matrix
a = np.zeros(5)
print("ZEROS MATRIX: ",a)

# All 1s Matrix
b = np.ones((2, 3, 4), dtype="int32")
print("ONES MATRIX: \n",b)

# Any other number
c = np.full((2, 4), 99, dtype="float32")
print("FULL MATRIX: \n",c)

# Any other number (full_like)
d = np.full_like(b, 4)
print("FULL LIKE MATRIX: \n",d)


# Random decimal numbers
e = np.random.rand(4, 2, 3)
print("RANDOM DECIMAL MATRIX: \n",e)

# Random Integer values
f = np.random.randint(90, 100, size=(3, 3))
print("RANDOM INTEGER MATRIX: \n",f)

# The identity matrix (square matrix)
g = np.identity(5)
print("IDENTITY MATRIX: \n",g)

# Repeat an array, you can repeat on column or rows with axis parameterss
arr = np.array([[1, 2, 3], [4, 5, 6]])
r1 = np.repeat(arr, 3, axis=0)
print(r1)


# Exercise

exer = np.ones((5, 5))
z = np.zeros((3, 3))
z[1, 1] = 9
print ("EXERCISE Z: \n", z)
exer[1:-1, 1:-1] = z
print("Exercise: \n",exer)

# Be careful when copying arrays!!!

a = np.array([1, 2, 3])
b = a # <- Use b = a.copy() to avoid this
# this uses pointers so it will edit both arrays
b[0] = 100
print(a)
print(b)

