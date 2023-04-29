import numpy as np

a = np.array([1, 2, 3], dtype="int16")
print(a)

b = np.array([[9.0,8.0,7.0],[6.0,5.0,4.0]])
print(b)


# Get dimension

print("DIMENSION a: ", a.ndim, " DIMENSION b: ", b.ndim)

# Get shape

print("SHAPE a: ", a.shape, " SHAPE b: ", b.shape)

# Get type

print("TYPE a: ", a.dtype, " TYPE b: ", b.dtype)

# Get size in bytes of each item in the array
print("itemsize a: ", a.itemsize, " itemsize b: ", b.itemsize)

# Get total size of the array
print("SIZE a: ", a.size * a.itemsize, " SIZE b: ", b.size * b.itemsize)
# OR
print("SIZE a: ", a.nbytes, " SIZE b: ", b.nbytes)