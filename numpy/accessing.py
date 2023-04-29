import numpy as np

a = np.array([[1, 2, 3, 4, 5, 6, 7, 8, 9], [11, 12, 13, 14, 15, 16, 17, 18, 19]])
print(a)

print(a.shape)

# Get a specific element [r, c]

print("Specific element",a[1, 5])
print("Specific element",a[1, -2])

# Get a specific row
print("Specific Row", a[0, :])

# Get a specific column
print("Specific Column",a[:, 1])


# Getting a little more fancy [startindex:endindex:stepsize]
g = a[0, 1:-2:2]
print("FANCIER",g, "\n")


# Replacing an element

a[1, 2] = 20
print("replace a[1,2] = 20\n",a)

a[:, 2] = [2]
print("a[:, 2] = [1, 2]\n", a)

b = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print("b array:\n", b)

b[0][1][1] = 10

print("b array after replacement:\n", b)


# replacement
b[:, 1, :] = [[9, 9], [8, 8]]
print("b array after replacement:\n", b)
