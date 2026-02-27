import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def explore_dataset(file_path):
    print(f"Loading dataset from: {file_path}...\n")
    df = pd.read_csv(file_path)
    
    # 1. Dataset Shape (Rows & Columns)
    print("--- 1. Dataset Shape ---")
    print(f"Total Rows (Reviews): {df.shape[0]}")
    print(f"Total Columns: {df.shape[1]}")
    print(f"Column Names: {list(df.columns)}\n")
    
    # 2. Sample Data
    print("--- 2. Sample Data (First 3 rows) ---")
    for i in range(3):
        print(f"Review {i+1}: {df['review'].iloc[i][:100]}...")
        print(f"Sentiment: {df['sentiment'].iloc[i]}\n")
        
    # 3. Label Distribution
    print("--- 3. Class Imbalance Check ---")
    sentiment_counts = df['sentiment'].value_counts()
    print(sentiment_counts)
    
    # Optional: Plot the distribution
    plt.figure(figsize=(6,4))
    sns.countplot(x='sentiment', data=df)
    plt.title('Sentiment Distribution')
    plt.savefig('sentiment_distribution.png')
    print("\nSaved a plot to 'sentiment_distribution.png' check it out!")

if __name__ == "__main__":
    explore_dataset("IMDB_Dataset.csv")
