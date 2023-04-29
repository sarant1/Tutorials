# Load data files

import os
import numpy as np




def generateFromDataFile():
    filedata = np.genfromtxt('data.txt', delimiter=',')
    filedata = filedata.astype('int32')
    print("Array From Generate \n", filedata)
    return filedata

filedata = generateFromDataFile()


def writeToDataFile():
    # Create a data file
    f = np.random.randint(100, size=(3, 20))
    dataFile = open("data.txt", "w+")

    # Write to the data file
    for i in range(len(f)):
        for g in range(len(f[0])):
            dataFile.write(str(f[i][g]) + ",")
        dataFile.write("\n")
    # Close the data file
    dataFile.close()


# Advanced Indexing (Boolean Masking and Fancy Indexing)

print("Boolean Masking", filedata > 50)
print("Print Indexes greater than 50: \n", filedata[filedata > 50])


# Indexing with a list

a = np.array([1,2,3,4,5,6,7,8,9])
a[[1,2,8]] = 0
print("Indexing with a list: \n", a)

# ~ is the not operator
print(~((filedata > 50) & (filedata < 75)))


